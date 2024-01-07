import axios from "axios";

export function createTODO(userId: number, todoName: string, todoAuthor: string, todoDesc: string) {
    const todoData = {
        user_id: userId,
        Name: todoName,
        Author: todoAuthor,
        Description: todoDesc,
    }
    axios.post("http://192.168.100.245:3001/todos", todoData)
    .then(() => {
        alert("TODO Created")
    })
    .catch(error => {console.log("error: " + error)})
}

export async function getUserTODOS(userId: number) {
    try {
        const response = await axios.get(`http://192.168.100.245:3001/todos/${userId}`);
        return response.data.userData;
    } catch (error) {
        console.error('Error fetching user todos:', error);
        throw error;
    }
}