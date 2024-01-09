import { Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalContent, ModalBody, Link, Input, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { getId, prepData } from "../../../utils/userData";

interface Fields {
    name?: string;
    surname?: string;
    email?: string;
    id?: number
}

export default function EditAccount() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const data = JSON.parse(sessionStorage.getItem("userData")!)
    const [fields, setFields] = useState<Fields>({"name": data.name, "surname": data.surname, "email": data.email, "id": getId()!});
    const [errMessage, setErrMessage] = useState('');
    const [errMessageName, setErrMessageName] = useState('');
    const [errMessageSur, setErrMessageSur] = useState('');


    const handleChange = (field: string, value: string) => {
        setFields({
            ...fields,
            [field]: value
        })
    }

    const handleForm = () => {

        let valid = true;

        if (!fields["name"]) {
            valid = false;
            setErrMessageName("Nie moze być puste");
        }
    
        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/)) {
                valid = false;
                setErrMessageName("Tylko litery");
            }
        }
    
        //SurName
        if (!fields["surname"]) {
            valid = false;
            setErrMessageSur("Nie moze być puste");
        }
    
        if (typeof fields["surname"] !== "undefined") {
            if (!fields["surname"].match(/^[a-zA-Z]+$/)) {
                valid = false;
                setErrMessageSur("Tylko litery");
            }
        }
    
        //Email
        if (!fields["email"]) {
            valid = false;
            setErrMessage("Nie moze być puste");
        }
    
        if (fields["email"] !== null) {
            const lastAtPos = fields["email"]?.lastIndexOf('@');
            const lastDotPos = fields["email"]?.lastIndexOf('.');
    
            if(typeof lastAtPos === 'number' && typeof lastDotPos  === 'number') {
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"]?.indexOf('@@') == -1 && lastDotPos > 2 && (fields?.["email"]?.length ?? 0 - lastDotPos) > 2)) {
                valid = false;
                setErrMessage("Email jest nieprawidłowy");
            }
            }
        }

        if(valid) {
            axios.post("http://192.168.100.245:3001/updateUserData", { "name": fields["name"], "surname": fields["surname"], "email": fields["email"], "id": fields["id"] })
            .then(() => {
                    console.log("retrived")
                    setErrMessage('');
                    setErrMessageName('')
                    setErrMessageSur('')
                    prepData(fields['email']!)
                })
            .catch(err => {
                console.log(err)
                if (err.response.status === 400) setErrMessage(err.response.data.error)
            })
        }
    }

    return (
        <Card className="">
        <CardHeader>
            <p>Edytuj konto</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-3">
            <Input
            label="imie"
            onChange={e => {handleChange("name", e.target.value);}}
            value={fields['name']}
            errorMessage={errMessageSur}
            isInvalid={errMessageName !== ""}
            />
            <Input
            label="nazwisko"
            onChange={e => {handleChange("surname", e.target.value);}}
            value={fields['surname']}
            errorMessage={errMessageSur}
            isInvalid={errMessageSur !== ""}
            />
            <Input
            label="email"
            onChange={e => {handleChange("email", e.target.value); setErrMessage('');}}
            isInvalid={errMessage !== ""}
            errorMessage={errMessage}
            value={fields['email']}/>
        </CardBody>
        <CardFooter className="flex justify-between">
            <Link onClick={onOpen} underline="always">Chce zmienić hasło</Link>
            <Button color="primary" variant="flat" onClick={handleForm}>Zmień</Button>
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