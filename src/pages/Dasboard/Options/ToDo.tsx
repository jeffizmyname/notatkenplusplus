import { useEffect, useState } from 'react';
import { getId } from '../../../utils/userData';
import { useParams } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Checkbox, Input } from '@nextui-org/react';
import { getElements, handleSave } from '../../../utils/saveLoad';
import { PlusIcon } from '../../../assets/icons/PlusIcon';

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
    }, [TODOid.todoID]);

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
        <div className='m-5 overflow-scroll'>
            <div className='w-full flex justify-center'>
                {todoData && (
                    <Card className='lg:max-w-[500px] lg:min-w-[300px] xs:w-full'>
                        <CardHeader>
                            <p className='text-3xl font-bold'>{todoData.Name}</p>
                        </CardHeader>
                        <CardBody>
                            <p>Opis: {todoData.Description}</p>
                        </CardBody>
                        <CardFooter className='flex flex-row justify-between'>
                            <p className='text-gray-500'>autor: {todoData.Author}</p>
                            <Button onClick={HandleSave}>Zapisz</Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 h-[fit] max-h-[50vh] xs:max-h-full w-full overflow-scroll mt-2 pt-10'>
                {entries.map((entry, index) => (
                    <div key={index} className='w-[full] h-[100px] flex justify-center'>
                        <Card className='w-full'>
                            <CardBody className='flex flex-row items-center'>
                            <Checkbox isSelected={entry.isDone}
                                onValueChange={(isChecked) => { handleCheckboxChange(index, isChecked) }}
                                value={String(index)} />
                                <div className='w-full'>
                                    <ButtonGroup className='w-full'>
                                        <div className='bg-[#3f3f46] h-[50px] w-[80%] flex items-center justify-center pl-2 rounded-l-lg'>
                                            <Input
                                                size='sm'
                                                labelPlacement="outside"
                                                defaultValue={entry.task}
                                                className='w-[30'
                                                onChange={(e) => handleTaskChange(index, e.target.value)} />
                                        </div>
                                        <Button className='h-[50px]' onClick={() => handleDelete(index)}>Delete</Button>
                                    </ButtonGroup>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
            <div className='fixed xs:top-[93%] lg:top-[92%] right-5'>
                <Button color='primary' onClick={addField}>Nowy wpis <PlusIcon /></Button>
            </div>
        </div>
    );
}

export default ToDo;