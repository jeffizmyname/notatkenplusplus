import { Card, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, CardBody } from "@nextui-org/react";
import { useState } from "react";
import { getId } from "../utils/userData";
import { useNavigate } from 'react-router-dom';
import { create } from "../utils/saveLoad";


type Props = {
    type: string,
    category: string,
    fileId: number,
    ListName: string,
    Author: string,
    Desc: string,
    CreationDate: string
}

interface todoForm {
    ListName?: string,
    Author?: string,
    Desc?: string
}


export default function CardElement(props: Props) {
    const navigate = useNavigate();

    const [fields, setFields] = useState<todoForm>({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const CardType = props.type;

    function parseDateString(dateString: string) {
        const date = new Date(dateString);

        const result = {
            year: date.getUTCFullYear(),
            month: date.getUTCMonth() + 1, // Months are zero-indexed
            day: date.getUTCDate(),
            hours: date.getUTCHours(),
            minutes: date.getUTCMinutes(),
            seconds: date.getUTCSeconds()
        };

        return result;
    }

    const parsedDate = parseDateString(props.CreationDate);

    const handleChange = (field: string, value: string) => {
        setFields({
            ...fields,
            [field]: value
        })
    }

    const handleOpen = () => {
        navigate(`/dashboard/${props.category}/${props.fileId}`)
    }

    return (
        <>
            <Card
                isPressable
                onPress={onOpen}
                className="min-w-[200px] h-[50px]">
                    {CardType !== "new" ?
                <CardBody>{props.ListName} autor {props.Author} data utworzenia {parsedDate.year} {parsedDate.month} {parsedDate.day} {parsedDate.hours}:{parsedDate.minutes}:{parsedDate.seconds}</CardBody>
            : <CardBody>
                utwórz nową notatke
                </CardBody>}
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {CardType !== "new" ? (
                        <ModalDefaultContent handleOpen={handleOpen} onClose={onClose} name={props.ListName} author={props.Author} desc={props.Desc} />
                    ) : (
                        <ModalNewContent onClose={onClose} handleChange={handleChange} fields={fields} category={props.category} />
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

type ModalDefaultContentProps = {
    handleOpen: () => void;
    onClose: () => void;
    name: string;
    author: string;
    desc: string;
};

export const ModalDefaultContent: React.FC<ModalDefaultContentProps> = ({ handleOpen, onClose, name, author, desc }) => (
    <>
        <ModalHeader className="flex flex-col gap-1">{name}</ModalHeader>
        <ModalBody>
            <p>{author}</p>
            <p>{desc}</p>
        </ModalBody>
        <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
                Close
            </Button>
            <Button color="primary" variant="light" onPress={onClose}>
                Share
            </Button>
            <Button color="primary" onPress={handleOpen}>
                Open
            </Button>
        </ModalFooter>
    </>
);


const ModalNewContent: React.FC<{ onClose: () => void; handleChange: (field: string, value: string) => void; fields: todoForm; category: string }> = ({ onClose, handleChange, fields, category }) => (
    <>
        <ModalHeader className="flex flex-col gap-1">Nowa Lista</ModalHeader>
        <ModalBody>
            <Input label="Nazwa Listy" onChange={e => handleChange('ListName', e.target.value)} value={fields.ListName || ''}></Input>
            <Input label="Autor" onChange={e => handleChange('Author', e.target.value)} value={fields.Author || ''}></Input>
            <Textarea
                label="Opis listy"
                className="max-w-m"
                onChange={e => handleChange('Desc', e.target.value)} value={fields.Desc || ''}
            />
        </ModalBody>
        <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
                Close
            </Button>
            <Button color="primary" onPress={() => create(category, getId()!, fields.ListName || '', fields.Author || '', fields.Desc || '')}>
                Create
            </Button>
        </ModalFooter>
    </>
);
