import { Input, Button, ModalBody, ModalFooter, ModalHeader, Textarea} from '@nextui-org/react';


export default function EventForm() {

    return (
            <>
                <ModalHeader>Nowe wydarzenie</ModalHeader>
                <ModalBody>
                    <Input
                    label="nazwa wydarzenia"/>
                    <div className='flex flex-row gap-3'>
                        <Input
                        type='time'/>
                        <Input
                        type='time'/>
                    </div>
                    <Textarea
                    label="opis"/>
                </ModalBody>
                <ModalFooter>
                    <Button
                    className='w-1/2'
                    variant='flat'
                    color='danger'>Anuluj</Button>
                    <Button
                    className='w-1/2'
                    variant='flat'
                    color='primary'>Dodaj</Button>
                </ModalFooter>
            </>
    )
}