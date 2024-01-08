import { Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalContent, ModalBody, Link, Input, useDisclosure } from "@nextui-org/react";

export default function EditAccount() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <Card className="">
        <CardHeader>
            <p>Edytuj konto</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-3">
            <Input
            label="imie"/>
            <Input
            label="nazwisko"/>
            <Input
            label="email"/>
        </CardBody>
        <CardFooter className="flex justify-between">
            <Link onClick={onOpen} underline="always">Chce zmienić hasło</Link>
            <Button color="primary" variant="flat">Zmień</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </CardFooter>
    </Card>
    )
}