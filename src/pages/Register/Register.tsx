import React, { useState } from 'react'
import { Card, Input, CardHeader, CardBody, CardFooter, Button, Link } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/icons/EyeFilledIcon";
import { EyeFilledSlashIcon } from "../../assets/icons/EyeFilledSlashIcon";
import axios from 'axios';



export default function Login() {
    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRep, setPasswordRep] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [message, setMessage] = useState('');

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleRegister = () => {
        axios.post('http://localhost:3001/register', { name, surName, email, password })
            .then(response => setMessage(response.data))
            .catch(error => setMessage('Error registering user'));
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordsMatch(event.target.value === passwordRep || passwordRep === "");
    };

    const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordRep(event.target.value);
        setPasswordsMatch(password === event.target.value);
    };

    function EyeButton() {
        return (
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                    <EyeFilledSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
            </button>
        )
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Card isBlurred className="w-1/6 bg-default/80">
                <CardHeader>
                    <p className="text-4xl w-full font-bold text-center">Register</p>
                </CardHeader>
                <CardBody className="flex flex-col gap-2">
                    <Input
                        size='md'
                        type='Name'
                        label="Name"
                        isInvalid={false}
                        onChange={(e) => setName(e.target.value)}>
                    </Input>
                    <Input
                        size='md'
                        type='Surname'
                        label="Surname"
                        isInvalid={false}
                        onChange={(e) => setSurName(e.target.value)}>
                    </Input>    
                    <Input
                        size="md"
                        type="email"
                        label="Email"
                        isInvalid={false}
                        color="default"
                        onChange={(e) => setEmail(e.target.value)}>
                    </Input>
                    <Input
                        size="md"
                        label="Password"
                        type={isVisible ? "text" : "password"}
                        isInvalid={!passwordsMatch}
                        color="default"
                        endContent={EyeButton()}
                        onChange={handlePasswordChange}>
                    </Input>
                    <Input
                        size="md"
                        label="Repeat your password"
                        type={isVisible ? "text" : "password"}
                        isInvalid={!passwordsMatch}
                        color="default"
                        endContent={EyeButton()}
                        onChange={handleRepeatPasswordChange}>
                    </Input>
                    <Button color="primary" variant='flat' onClick={handleRegister}>Create account</Button>
                </CardBody>
                <CardFooter>
                    <p className="text-small w-full text-center">Do you have an account? Login <Link href='/login' className='pointer-events-auto' underline="always">Here</Link></p>
                </CardFooter>
            </Card>
        </div>
    );
}