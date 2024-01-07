import { Input, Button, ModalBody, ModalFooter, ModalHeader, Textarea} from '@nextui-org/react';
import axios from 'axios';
import { format } from 'date-fns';
import { useState } from 'react';
import { getId } from '../../../../utils/userData';

interface Fields {
    type?: string,
    title?: string,
    start?: string,
    end?: string,
    desc?: string,
    date?: string
}

interface Props {
    today: Date
}

export default function EventForm(props: Props) {
    const [fields, setFields] = useState<Fields>({"type": "event", "date": format(props.today, "yyyy-MM-dd")});

    const handleChange = (field: string, value: string) => {
        setFields({
            ...fields,
            [field]: value
        })
    }


    const handleEvent = () => {
        const id = getId();
        const string = JSON.stringify(fields)
        handleChange("type", "event")
        handleChange("date", format(props.today, "yyyy-MM-dd"))
        console.log(fields)
        axios.post("http://192.168.100.245:3001/calendar/addTask", {id, string})
        .catch(err => console.log(err))
    }

    return (
            <>
                <ModalHeader>Nowe wydarzenie</ModalHeader>
                <ModalBody>
                    <Input
                    type='text'
                    label="nazwa wydarzenia"
                    onChange={(e) => handleChange('title', e.target.value)}
                    value={fields['title']}/>
                    <div className='flex flex-row gap-3'>
                        <Input
                        type='time'
                        startContent="od"
                        onChange={e => handleChange('start', e.target.value)}
                        value={fields['start']}/>
                        <Input
                        startContent="do"
                        type='time'
                        onChange={e => handleChange('end', e.target.value)}
                        value={fields['end']}/>
                    </div>
                    <Textarea
                    label="opis"
                    onChange={e => handleChange('desc', e.target.value)}
                    value={fields['desc']}/>
                </ModalBody>
                <ModalFooter>
                    <Button
                    className='w-1/2'
                    variant='flat'
                    color='danger'>Anuluj</Button>
                    <Button
                    className='w-1/2'
                    variant='flat'
                    color='primary'
                    onClick={handleEvent}>Dodaj</Button>
                </ModalFooter>
            </>
    )
}