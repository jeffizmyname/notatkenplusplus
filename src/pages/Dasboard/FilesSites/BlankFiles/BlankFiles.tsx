import { useEffect, useState } from "react";
import { getElements } from "../../../../utils/saveLoad";
import { getId } from "../../../../utils/userData";
import CardElement from "../../../../components/CardElement";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

interface NotesItem {
  id: number;
  user_id: number;
  Name: string;
  Author: string;
  Description: string;
  CreationDate: string;
  Data: string;
}

//aformatuj ta do takiego co da sie odczytac dzisiaj juz nie mam siły i nwm czy zdaze jutro :<

const columns = [
  {
    key: "nazwa",
    label: "NAZWA",
  },
  {
    key: "autor",
    label: "AUTOR",
  },
  {
    key: "datautworzenia",
    label: "DATA UTWORZENIA",
  },
];

export default function BlankFiles() {
  const [userNotes, setUserNotes] = useState<NotesItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getElements("blank", getId()!)
        setUserNotes(userData);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="m-4 mr-0">
      <div>
        <p
          className="m-2 text-xl">Twoje notatki</p>
        <div className="flex flex-col gap-5 overflow-y-scroll mr-10">
          <CardElement type="new" category="blank" fileId={0} ListName="" Author="" Desc="" CreationDate="" />
          {JSON.stringify(userNotes)}
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
          <Table>
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={userNotes}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}