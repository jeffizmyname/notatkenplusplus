import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HandleValidation } from '../../utils/validation'
import { Card, Input, CardHeader, CardBody, CardFooter, Button, Link } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/icons/EyeFilledIcon";
import { EyeFilledSlashIcon } from "../../assets/icons/EyeFilledSlashIcon";
import axios from 'axios';

interface Fields {
    name?: string;
    surName?: string;
    email?: string;
    password?: string;
    passwordRep?: string;
}

interface Errors {
    name?: string;
    email?: string;
    surName?: string;
    password?: string;
    passwordRep?: string;
}

export default function Login() {
    const navigate = useNavigate();
    const [fields, setFields] = useState<Fields>({});
    const [errors, setErrors] = useState<Errors>({});
    const [message, setMessage] = useState('');

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleRegister = () => {
        const userObject = {
            name: fields['name'],
            surName: fields['surName'],
            email: fields['email'],
            password: fields['password']
        };
        axios.post('http://localhost:3001/register', userObject)
            .then(response => {
                setMessage(response.data)
                navigate('/dashboard')
            })
            .catch(error => {
                if(error.response.status === 500) {
                    setMessage('Error registering user email in databse ' + error.message); 
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: 'This email is already in use',
                    }));
                }
            })
            .finally(() => console.log(message));
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

    const handleChange = (field: string, value: string) => {
        setFields({
            ...fields,
            [field]: value
        })
    }

    const handleRetrive = () => {
        const formFields = { ...fields };
        
        const formErrors = HandleValidation(formFields);

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }

    const contactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (handleRetrive()) {
            console.log("Form submitted"  + JSON.stringify(errors) + JSON.stringify(fields));
            handleRegister();
        } else {
            console.log("Form has errors."  + JSON.stringify(errors) + JSON.stringify(fields))
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Card isBlurred className="w-1/4 max-w-[400px] min-w-[300px] bg-default/80">
                <CardHeader>
                    <p className="text-4xl w-full font-bold text-center">Register</p>
                </CardHeader>
                <form onSubmit= {e => contactSubmit(e)}>
                    <CardBody className="flex flex-col gap-2">
                        <Input
                            size='md'
                            type='Name'
                            label="Name"
                            isInvalid={"name" in errors}
                            errorMessage={"name" in errors ? errors['name'] : ""}
                            onChange={e => handleChange('name', e.target.value)}
                            value={fields["name"]}>
                        </Input>
                        <Input
                            size='md'
                            type='Surname'
                            label="Surname"
                            isInvalid={"surName" in errors}
                            errorMessage={"surName" in errors ? errors['surName'] : ""}
                            onChange={e => handleChange('surName', e.target.value)}
                            value={fields["surName"]}>
                        </Input>
                        <Input
                            size="md"
                            type="email"
                            label="Email"
                            isInvalid={"email" in errors}
                            errorMessage={"email" in errors ? errors['email'] : ""}
                            color="default"
                            onChange={e => handleChange('email', e.target.value)}
                            value={fields["email"]}>
                        </Input>
                        <Input
                            size="md"
                            label="Password"
                            type={isVisible ? "text" : "password"}
                            isInvalid={"password" in errors}
                            errorMessage={"password" in errors ? errors['password'] : ""}
                            color="default"
                            endContent={EyeButton()}
                            onChange={e => handleChange('password', e.target.value)}
                            value={fields["password"]}>
                        </Input>
                        <Input
                            size="md"
                            label="Repeat your password"
                            type={isVisible ? "text" : "password"}
                            isInvalid={"passwordRep" in errors}
                            errorMessage={"passwordRep" in errors ? errors['passwordRep'] : ""}
                            color="default"
                            endContent={EyeButton()}
                            onChange={e => handleChange('passwordRep', e.target.value)}
                            value={fields["passwordRep"]}>
                        </Input>
                        <Button type="submit" color="primary" variant='flat'>Create account</Button>
                    </CardBody>
                </form>
                <CardFooter>
                    <p className="text-small w-full text-center">Do you have an account? Login <Link href='/login' className='pointer-events-auto' underline="always">Here</Link></p>
                </CardFooter>
            </Card>
        </div>
    );
}