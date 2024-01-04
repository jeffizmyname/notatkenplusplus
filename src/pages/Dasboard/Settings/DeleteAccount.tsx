import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";

export default function DeleteAccount() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <Card className="w-[500px] h-[180px]">
        <CardHeader>
            <p>Usuń konto</p>
        </CardHeader>
        <CardBody >
            <Checkbox color="danger">Jestem świadomy/a że usunięcie konta wiąże sie z całkowitą bezpowrotną utratą danych</Checkbox>
        </CardBody>
        <CardFooter>
            <Button color="danger" variant="flat" onClick={onOpen}>Usuń</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader>Czy jeteś pewien/pewna</ModalHeader>
                    <ModalBody className="flex flex-row">
                        <Button color="danger" variant="flat" className="w-1/2">Tak</Button>
                        <Button variant="flat" className="w-1/2" onClick={onOpenChange}>Nie</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </CardFooter>
    </Card>
    )
}