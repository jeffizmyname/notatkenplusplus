import { useEffect, useState } from "react";
import CardElement, { ModalDefaultContent } from "../../../../components/CardElement";
import { getId } from "../../../../utils/userData";
import { getElements } from "../../../../utils/saveLoad";
import { Modal, ModalContent, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import OpenToDoTT from "./OpenToDoTT";
import DeleteToDoTT from "./DeleteToDoTT";

interface TodoItem {
  id: number;
  Name: string;
  Author: string;
  Description: string;
  CreationDate: string
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

let todo: TodoItem | undefined;


export default function ToDoFiles() {
  const navigate = useNavigate();
  const [userTODOs, setUserTODOs] = useState<TodoItem[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();


  useEffect(() => {

    const updateUserToDos = (notes: TodoItem[]) => {
      return notes.map((note) => ({
        ...note,
        CreationDate: formatCreationDate(note.CreationDate)
      }));
    }


    async function fetchData() {
      try {
        const userData = await getElements("todo", getId()!)
        setUserTODOs(updateUserToDos(userData));

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

  type Todo = typeof userTODOs[0];
  const renderCell = React.useCallback((todo: TodoItem, columnKey: React.Key) => {
    const cellValue = todo![columnKey as keyof Todo];
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
            <OpenToDoTT id={todo.id}/>
            <DeleteToDoTT id={todo.id}/>
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

  const findToDoById = (id: number) => {
    return userTODOs.find(todo => todo.id === id);
  };

  const handleClick = (key: number | bigint | string) => {
    todo = findToDoById(Number(key))
    onOpen()
  }

  const handleOpen = () => {
    navigate(`/dashboard/todo/${todo!.id}`)
  }

  //console.log(userTODOs);


  return (
    <div className="m-4 mx-6">
      <div>
        <div className="flex flex-row justify-between mb-4">
          <p className="m-2 text-3xl">Twoje TODO</p>
          <CardElement type="new" category="todo" fileId={0} ListName="" Author="" Desc="" CreationDate="" />
        </div>
        <div className="flex overflow-y-scroll">
          {/* {userTODOs.map((todo, index) => (
            <CardElement
              key={index}
              type="todo"
              category="todo"
              fileId = {todo.id}
              ListName={todo.Name} 
              Author={todo.Author}
              Desc={todo.Description}
              CreationDate={todo.CreationDate} 
            />
          ))} */}
          <Table
            isStriped
            aria-label="e"
            onRowAction={(key) => handleClick(key)}>
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={userTODOs}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {todo !== undefined ?
                <ModalDefaultContent handleOpen={handleOpen} onClose={onClose} name={todo.Name} author={todo.Author} desc={todo.Description} />
                : "dudu"}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  )
}