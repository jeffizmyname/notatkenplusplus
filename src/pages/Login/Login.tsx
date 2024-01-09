import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Input, CardHeader, CardBody, CardFooter, Button, Link } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/icons/EyeFilledIcon";
import { EyeFilledSlashIcon } from "../../assets/icons/EyeFilledSlashIcon";
import { prepData } from '../../utils/userData';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');

    const handleLogin = () => {
        axios.post('http://192.168.100.245:3001/login', { email, password })
            .then(response => {
                console.log(response.data);
                sessionStorage.setItem("loggedIn", "true")
                sessionStorage.setItem("userData", `{"email": "${email}"}`)
                prepData(email)
                setErrMessage('');
                navigate('/dashboard/Calendar');
            })
            .catch(error => {
                if (error.response.status === 401) setErrMessage('Zły email lub hasło')
                if (error.response.status === 400) { setErrMessage('Error podczas logowania'); console.log(error) }
            });
    };

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Card isBlurred className="w-1/4 max-w-[400px] min-w-[300px] bg-default/80">
                <CardHeader>
                    <p className="text-4xl w-full font-bold text-center">Zaloguj się</p>
                </CardHeader>
                <CardBody className="flex flex-col gap-2">
                    <Input
                        size="md"
                        type="email"
                        label="Email"
                        isInvalid={errMessage !== ""}
                        placeholder="ty@example.com"
                        color="default"
                        onChange={(e) => setEmail(e.target.value)}>
                    </Input>
                    <Input
                        size="md"
                        label="Hasło"
                        type={isVisible ? "text" : "password"}
                        isInvalid={errMessage !== ""}
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
                    <Button color="primary" variant='flat' onClick={handleLogin}>Zaloguj się</Button>
                    {/* {errMessage && <p className='w-full text-center text-red-700'>{errMessage}</p>} */}
                </CardBody>
                <CardFooter>
                    <p className="text-small w-full text-center">Nie masz Konta? Zarejestruj sie <Link href="/register" className='pointer-events-auto' underline="always">Tutaj</Link></p>
                </CardFooter>
            </Card>
        </div>
    );
}