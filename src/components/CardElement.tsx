import { Card, CardFooter, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { createTODO } from "../utils/TODOfunctions";
import { useState } from "react";
import { getId } from "../utils/userData";

type Props = {
    type: string
    ListName: string,
    Author: string,
    Desc: string
}

interface todoForm {
    ListName?: string,
    Author?: string,
    Desc?: string
}


export default function CardElement(props: Props) {
    const [fields, setFields] = useState<todoForm>({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const CardType = props.type;

    const handleChange = (field: string, value: string) => {
        setFields({
            ...fields,
            [field]: value
        })
    }

    return (
        <>
            <Card
                isFooterBlurred
                isPressable
                onPress={onOpen}
                className="w-[200px] h-[200px]">

                {CardType !== "new" ? (
                    <>
                        <Image
                            alt="preview test"
                            src="https://picsum.photos/200"
                            width={200}
                        />
                        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                            {props.ListName}
                        </CardFooter>
                    </>
                ) : (
                    <Button className="w-[20px] h-[20px]">New</Button>
                )}
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {CardType !== "new" ? (
                        <ModalDefaultContent onClose={onClose} name={props.ListName} author={props.Author} desc={props.Desc}/>
                    ) : (
                        <ModalNewContent onClose={onClose} handleChange={handleChange} fields={fields} />
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

type ModalDefaultContentProps = {
    onClose: () => void;
    name: string;  // Updated from ListName to name
    author: string;  // Updated from Author to author
    desc: string;  // Updated from Desc to desc
};

const ModalDefaultContent: React.FC<ModalDefaultContentProps> = ({ onClose, name, author, desc }) => (
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
            <Button color="primary" onPress={onClose}>
                Open
            </Button>
        </ModalFooter>
    </>
);


const ModalNewContent: React.FC<{ onClose: () => void; handleChange: (field: string, value: string) => void; fields: todoForm }> = ({ onClose, handleChange, fields }) => (
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
            <Button color="primary" onPress={() => createTODO(getId()!, fields.ListName || '', fields.Author || '', fields.Desc || '')}>
                Create
            </Button>
        </ModalFooter>
    </>
);
