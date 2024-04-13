import axios from "axios"
import { getId } from "./userData"

export function create(type: string, userId: number, Name: string, Author: string, Desc: string) {
    const prepData = {
        user_id: userId,
        Name: Name,
        Author: Author,
        Description: Desc,
    }
    axios.post(`http://192.168.100.245:3001/${type}`, prepData)
    .then(() => {
        console.log(`${type} created`)
    })
    .catch(error => {console.log("error: " + error)})
}

export async function getElements(type: string, userId: number) {
    try {
        const response = await axios.get(`http://192.168.100.245:3001/${type}/${userId}`)
        return response.data.userData
    } catch (error) {
        console.error('Error fetching user todos:', error);
        throw error;
    }
}

interface TypeData {
    id: number;
    user_id: number;
    Name: string;
    Author: string;
    Description: string;
    Data: Record<string, unknown> | null;
}

interface Note {
    id: number;
    user_id: number;
    Name: string;
    Author: string;
    Description: string;
    Data: Record<string, unknown> | null;
}

export async function handleSave(type: string, json: unknown, Data: TypeData | Note | null ) {
    try {
        const jsonData = JSON.stringify(json);
        await axios.post(`http://192.168.100.245:3001/${type}/update`, {
            id: Data?.id,
            user_id: getId()!,
            Name: Data?.Name,
            Author: Data?.Author,
            Description: Data?.Description,
            Data: jsonData,
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

interface Todo {
    id: number;
    user_id: number;
    Name: string;
    Author: string;
    Description: string;
    Data: Record<string, unknown> | null;
}

export const HandleDownload = async (id: number) => {
    const userData = await getElements("todo", getId()!)
    const resultObject = userData.find((item: Todo) => item.id === Number(id));

    let data = "";
    data += "opis: " + resultObject.Description + "\n autor: " + resultObject.Author + "\n\n";
    JSON.parse(resultObject.Data).forEach((el: { task: string; isDone: string; }) => {
        data += el.task + " - " + (el.isDone ? "zrobione" : "nie zrobione") + "\n"
    });

    const text = data
    const element = document.createElement('a')
    const file = new Blob([text], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = resultObject.Name
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}