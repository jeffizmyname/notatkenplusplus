import { useEffect, useState } from "react";
import { getElements } from "../../../../utils/saveLoad";
import { getId } from "../../../../utils/userData";
import CardElement, { ModalDefaultContent } from "../../../../components/CardElement";
import { Modal, ModalContent, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import OpenBlankTT from "./OpenBlankTT";
import DeleteBlankTT from "./DeleteBlankTT";

interface NotesItem {
  id: number;
  user_id: number;
  Name: string;
  Author: string;
  Description: string;
  CreationDate: string;
  Data: string;
}

const columns = [
  {
    key: "Name",
    label: "NAZWA",
  },
  {
    key: "Author",
    label: "AUTOR",
  },
  {
    key: "CreationDate",
    label: "DATA UTWORZENIA",
  },
  {
    key: "actions",
    label: "AKCJE"
  }
];

let note: NotesItem | undefined;

export default function BlankFiles() {
  const navigate = useNavigate();
  const [userNotes, setUserNotes] = useState<NotesItem[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();



  useEffect(() => {
    const updateUserNotes = (notes: NotesItem[]) => {
      return notes.map((note) => ({
      ...note,
      CreationDate: formatCreationDate(note.CreationDate)
    }));}

    async function fetchData() {
      try {
        const userData = await getElements("blank", getId()!)
        setUserNotes(updateUserNotes(userData));
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000); 

    return () => clearInterval(intervalId);
  }, []);

  type Note = typeof userNotes[0];
  const renderCell = React.useCallback((note: NotesItem, columnKey: React.Key) => {
    const cellValue = note![columnKey as keyof Note];
    switch (columnKey) {
      default:
        return (
          <div className="m-2">
            {cellValue}
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <OpenBlankTT id={note.id}/>
            <DeleteBlankTT id={note.id}/>
          </div>
        );
    }

  }, []);

  function formatCreationDate(dateString: string) {
    const formattedDate = new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return formattedDate;
  }

  const findNoteById = (id: number) => {
    return userNotes.find(note => note.id === id);
  };

  const handleClick = (key: number | bigint | string) => {
    note = findNoteById(Number(key))
    onOpen()
  }

  const handleOpen = () => {
    navigate(`/dashboard/blank/${note!.id}`)
  }

  return (
    <div className="m-4 mx-6">
      <div>
        <div className="flex flex-row justify-between mb-4">
        <p className="m-2 text-3xl">Twoje notatki</p>
          <CardElement type="new" category="blank" fileId={0} ListName="" Author="" Desc="" CreationDate="" />
        </div>
        <div className="flex overflow-y-scroll">
          {/* {JSON.stringify(userNotes)} */}
          {/* {userNotes.map((note, index) => (

              <CardElement
                key={index}
                type="blank"
                category="blank"
                fileId = {note.id}
                ListName={note.Name} 
                Author={note.Author}
                Desc={note.Description} 
                CreationDate={note.CreationDate}
              />
            ))} */}
          <Table
            isStriped 
            aria-label="e"
            onRowAction={(key) => handleClick(key)}>
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={userNotes}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {note !== undefined ?
              <ModalDefaultContent handleOpen={handleOpen} onClose={onClose} name={note.Name} author={note.Author} desc={note.Description} />
              : "dudu"}
              </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  )
}