import { useEffect, useState } from "react";
import { getElements } from "../../../../utils/saveLoad";
import { getId } from "../../../../utils/userData";
import CardElement from "../../../../components/CardElement";

interface NotesItem {
  id: number;
  Name: string;
  Author: string;
  Description: string;
}

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
          className="m-2 text-xl">Dzisiaj</p>
          <div className="flex flex-row gap-5 overflow-y-scroll">
          <CardElement type="new" category="blank" fileId={0} ListName="" Author="" Desc="" />
            {userNotes.map((note, index) => (
              <CardElement
                key={index}
                type="blank"
                category="blank"
                fileId = {note.id}
                ListName={note.Name} 
                Author={note.Author}
                Desc={note.Description} 
              />
            ))}
          </div>
      </div>
    </div>
    )  
  }