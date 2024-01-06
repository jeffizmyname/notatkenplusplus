import { Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalContent, ModalBody, Link, Input, useDisclosure } from "@nextui-org/react";

export default function EditAccount() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <Card className="w-[500px]">
        <CardHeader>
            <p>Edytuj konto</p>
        </CardHeader>
        <CardBody>
            <Input
            label="email"/>
            <Input
            type="file"
            label="avatar"/>
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