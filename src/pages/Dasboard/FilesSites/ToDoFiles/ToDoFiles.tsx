import { useEffect, useState } from "react";
import CardElement from "../../../../components/CardElement";
import { getUserTODOS } from "../../../../utils/TODOfunctions";
import { getId } from "../../../../utils/userData";

interface TodoItem {
  Name: string;
  Author: string;
  Description: string;
}

export default function ToDoFiles() {
  const [userTODOs, setUserTODOs] = useState<TodoItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserTODOS(getId()!);
        setUserTODOs(userData);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  console.log(userTODOs);


  return (
    <div>
      <div>
        <p>Dzisiaj</p>
        <div className="flex flex-row gap-5">
        <CardElement type="new" ListName="" Author="" Desc="" />
          {userTODOs.map((todo, index) => (
            <CardElement
              key={index}
              type="TODO"
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