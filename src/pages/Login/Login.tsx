import React, { useState } from 'react'
import axios from 'axios';
import { Card, Input, CardHeader, CardBody, CardFooter, Button, Link } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/icons/EyeFilledIcon";
import { EyeFilledSlashIcon} from "../../assets/icons/EyeFilledSlashIcon";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');

    const handleLogin = () => {
        axios.post('http://localhost:3001/login', { email, password })
            .then(response => console.log(response.data))
            .catch(error => setErrMessage('Error logging in'));
    };

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Card isBlurred className="w-1/6 bg-default/80">
                <CardHeader>
                    <p className="text-4xl w-full font-bold text-center">Log in</p>
                </CardHeader>
                <CardBody className="flex flex-col gap-2">
                    <Input
                        size="md"
                        type="email"
                        label="Email"
                        isInvalid={false}
                        placeholder="you@example.com"
                        color="default"
                        onChange={(e) => setEmail(e.target.value)}>
                    </Input>
                    <Input
                        size="md"
                        label="Password"
                        type={isVisible ? "text" : "password"}
                        isInvalid={false}
                        color="default"
                        onChange={(e) => setPassword(e.target.value)}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeFilledSlashIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }>
                        </Input>
                    <Button color="primary" variant='flat' onClick={handleLogin}>Login</Button>
                    {errMessage && <p>{errMessage}</p>}
                </CardBody>
                <CardFooter>
                    <p className="text-small w-full text-center">No account? Regiester <Link href="/register" className='pointer-events-auto' underline="always">Here</Link></p>
                </CardFooter>
            </Card>
        </div>
    );
}