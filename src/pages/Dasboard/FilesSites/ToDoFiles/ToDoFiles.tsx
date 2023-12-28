import { useEffect, useState } from "react";
import CardElement from "../../../../components/CardElement";
import { getId } from "../../../../utils/userData";
import { getElements } from "../../../../utils/saveLoad";

interface TodoItem {
  id: number;
  Name: string;
  Author: string;
  Description: string;
}

export default function ToDoFiles() {
  const [userTODOs, setUserTODOs] = useState<TodoItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getElements("todo", getId()!)
        setUserTODOs(userData);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  console.log(userTODOs);


  return (
    <div className="m-4 mr-0">
      <div>
        <p
        className="m-2 text-xl">Dzisiaj</p>
        <div className="flex flex-row gap-5 overflow-y-scroll">
        <CardElement type="new" category="todo" fileId={0} ListName="" Author="" Desc="" />
          {userTODOs.map((todo, index) => (
            <CardElement
              key={index}
              type="todo"
              category="todo"
              fileId = {todo.id}
              ListName={todo.Name} 
              Author={todo.Author}
              Desc={todo.Description} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}