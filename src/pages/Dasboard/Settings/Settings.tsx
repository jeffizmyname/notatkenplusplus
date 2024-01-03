import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Link, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";

export default function Settings() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    //tak zeby 2 modale działały


    return (
        <div>
            <p>zmiana avatara / wysylaj emaile z nowosciami / zmiana hasla / zmiani emaila /  usun konto</p>
            <p>Ustawienia</p>
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
            <Card className="w-[500px]">
                <CardBody className="flex flex-row justify-between">
                    <Checkbox>Chce otrymywać newslettera z nowościami</Checkbox>
                    <Button color="primary" variant="flat">Zapisz</Button>
                </CardBody>
            </Card>
            <Card className="w-[500px]">
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
        </div>
    )
}