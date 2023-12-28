import { useEffect, useState } from 'react';
import { getId } from '../../../utils/userData';
import { useParams } from 'react-router-dom';
import { Button, Checkbox, CheckboxGroup, Input } from '@nextui-org/react';
import { getElements, handleSave } from '../../../utils/saveLoad';

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
                const userData = await getElements("todo", getId()!)
                const resultObject = userData.find((item: Todo) => item.id === Number(TODOid.todoID));
                setTodoData(resultObject);
                console.log(userData)
                if (resultObject && resultObject.Data) {
                    const unescapedString = resultObject.Data.replace(/\\"/g, '"');
                    const jsonArray = JSON.parse(unescapedString);
                    setEntries(jsonArray);
                }
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
    //!zamien na funkcje z saveLoad
    const HandleSave = () => {
        handleSave("todo", entries, todoData);
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
                <Button onClick={HandleSave}>Zapisz</Button>
            </div>
        </div>
    );
}

export default ToDo;