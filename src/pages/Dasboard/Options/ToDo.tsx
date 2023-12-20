import { useState } from "react";

export default function ToDo() {

    const [todos, setTodos] = useState();
    const [input, setInput] = useState('');

    const addTodo = (e) => {
        e.preventDefault();
        setTodos([...todos, input]);
        setInput('')
    };

    return (
        <div>
            <h1>ToDo Name</h1>
            
        </div>
    )
}