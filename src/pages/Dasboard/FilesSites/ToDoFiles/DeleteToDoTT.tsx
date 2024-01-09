import { Button, Modal, ModalBody, ModalContent, ModalFooter, Tooltip, useDisclosure } from "@nextui-org/react";
import { DeleteIcon } from "../../../../assets/icons/DeleteIcon";
import axios from "axios";

interface Props {
    id: number
}

export default function DeleteToDoTT(props: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDelete = () => {
        const id = props.id;
        axios.post("http://192.168.100.245:3001/todo/delete", { id })
        .then(res => console.log(res))
        .catch(err => console.log(err))
        onClose()
    }

    return (
        <>
            <Tooltip color="danger" content="Usuń" >
                <span onClick={onOpen} className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                </span>
            </Tooltip>
            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalContent>
                    <ModalBody className="text-2xl my-5">
                        Czy napewno chesz usunąć ten element
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Nie</Button>
                        <Button color="danger" onClick={handleDelete}>Tak</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}