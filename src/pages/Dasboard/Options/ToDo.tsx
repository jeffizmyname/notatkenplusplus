import { useEffect, useState } from 'react';
import { getUserTODOS } from '../../../utils/TODOfunctions';
import { getId } from '../../../utils/userData';
import { useParams } from 'react-router-dom';
import { Button, Checkbox, CheckboxGroup, Input } from '@nextui-org/react';
import axios from 'axios';

interface Todo {
    id: number;
    user_id: number;
    Name: string;
    Author: string;
    Description: string;
    Data: Record<string, unknown> | null;
}

function ToDo() {
    const TODOid = useParams()
    const [todoData, setTodoData] = useState<Todo | null>(null);
    const [entries, setEntries] = useState<{ isDone: boolean; task: string }[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await getUserTODOS(getId()!);
                const resultObject = userData.find((item: Todo) => item.id === Number(TODOid.todoID));
                setTodoData(resultObject);
                if (resultObject && resultObject.Data) {
                    const unescapedString = resultObject.Data.replace(/\\"/g, '"');
                    const jsonArray = JSON.parse(unescapedString);
                    setEntries(jsonArray);
                }
                console.log(entries)
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    function addField() {
        setEntries((prevEntries) => [...prevEntries, { isDone: false, task: '' }]);
        console.log(entries)
    }

    const handleTaskChange = (index: number, value: string) => {
        setEntries((prevEntries) =>
            prevEntries.map((entry, i) => (i === index ? { ...entry, task: value } : entry))
        );
    };

    const handleCheckboxChange = (index: number, isChecked: boolean) => {
        setEntries((prevEntries) =>
            prevEntries.map((entry, i) => (i === index ? { ...entry, isDone: isChecked } : entry))
        );
    };

    const handleDelete = (index: number) => {
        setEntries((prevEntries) => prevEntries.filter((entry, i) => i !== index));
    };

    const handleSave = async () => {
        try {
            const jsonData = JSON.stringify(entries);
            await axios.post('http://localhost:3001/todos/update', {
                id: todoData?.id,
                user_id: getId()!,
                Name: todoData?.Name,
                Author: todoData?.Author,
                Description: todoData?.Description,
                Data: jsonData,
            });

            console.log('Todo updated successfully');
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };



    return (
        <div>
            <div>
                {todoData && (
                    <>
                        <p>Nazwa: {todoData.Name}</p>
                        <p>Autor: {todoData.Author}</p>
                        <p>Opis: {todoData.Description}</p>
                    </>
                )}
            </div>
            <div>
                <p>wpisy</p>
                <CheckboxGroup>
                    {entries.map((entry, index) => (
                        <div key={index} className='w-[250px] flex row'>
                            <Checkbox isSelected={entry.isDone}
                                onValueChange={(isChecked) => { handleCheckboxChange(index, isChecked) }}
                                value={String(index)} />
                            <Input
                                defaultValue={entry.task}
                                onChange={(e) => handleTaskChange(index, e.target.value)} />
                            <Button onClick={() => handleDelete(index)}>Delete</Button>
                        </div>
                    ))}
                </CheckboxGroup>
            </div>
            <div>
                <Button onClick={addField}>Nowy wpis</Button>
                <Button onClick={handleSave}>Zapisz</Button>
            </div>
        </div>
    );
}

export default ToDo;