import React, { useState } from 'react'
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
    const [fields, setFields] = useState<Fields>({});
    const [errors, setErrors] = useState<Errors>({});
    const [message, setMessage] = useState('');

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    //!fix register
    const handleRegister = () => {
        const userObject = {
            name: fields['name'],
            surName: fields['surName'],
            email: fields['email'],
            password: fields['password']
        };
        axios.post('http://localhost:3001/register', {userObject.name, userObject.surName, userObject.email, userObject.password})
            .then(response => setMessage(response.data))
            .catch(error => setMessage('Error registering user ' + error));
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

    const handleValidation = () => {
        const formFields = { ...fields };
        const formErrors: Errors = {};
        let formIsValid = true;

        //Name
        if (!formFields["name"]) {
            formIsValid = false;
            formErrors["name"] = "Cannot be empty";
        }

        if (typeof formFields["name"] !== "undefined") {
            if (!formFields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                formErrors["name"] = "Only letters";
            }
        }

        //SurName
        if (!formFields["surName"]) {
            formIsValid = false;
            formErrors["surName"] = "Cannot be empty";
        }

        if (typeof formFields["surName"] !== "undefined") {
            if (!formFields["surName"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                formErrors["surName"] = "Only letters";
            }
        }

        //Email
        if (!formFields["email"]) {
            formIsValid = false;
            formErrors["email"] = "Cannot be empty";
        }

        if (typeof formFields["email"] !== "undefined") {
            const lastAtPos = formFields["email"].lastIndexOf('@');
            const lastDotPos = formFields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && formFields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields?.["email"]?.length ?? 0 - lastDotPos) > 2)) {
                formIsValid = false;
                formErrors["email"] = "Email is not valid";
            }
        }

        //password
        if(!formFields["password"]) {
            formIsValid = false;
            formErrors["password"] = "Cannot be empty";
        } else {
            if (formFields["password"].length < 8) {
                return 'Password must be at least 8 characters long';
            }
    
            // Regular expressions for additional criteria
            const hasUpperCase = /[A-Z]/.test(formFields["password"]);
            const hasLowerCase = /[a-z]/.test(formFields["password"]);
            const hasDigit = /\d/.test(formFields["password"]);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formFields["password"]);
    
            // Check additional criteria
            if (!hasUpperCase) {
                formErrors["password"] = 'Password must contain at least one uppercase letter';
            }
    
            if (!hasLowerCase) {
                formErrors["password"] = 'Password must contain at least one lowercase letter';
            }
    
            if (!hasDigit) {
                formErrors["password"] = 'Password must contain at least one digit';
            }
    
            if (!hasSpecialChar) {
                formErrors["password"] = 'Password must contain at least one special character';
            }
        }
        
        if(!formFields["passwordRep"]) {
            formIsValid = false;
            formErrors["passwordRep"] = "Cannot be empty";
        } else {
            if(formFields["passwordRep"] !== formFields["password"] && formFields["passwordRep"] != "") {
                formErrors["passwordRep"] = "The passwords dont match";
            }
        }

        
        //formErrors["passwordRep"] = validatePassword(formFields["passwordRep"]!)

        setErrors(formErrors)
        return formIsValid;
    }

    const handleChange = (field: string, value: string) => {
        setFields({
            ...fields,
            [field]: value
        })
    }

    const contactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (handleValidation()) {
            console.log("Form submitted"  + JSON.stringify(errors) + JSON.stringify(fields));
            handleRegister();
            console.log(message)
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
                        <Button type="submit" color="primary" variant='flat' /*onClick={handleRegister}*/>Create account</Button>
                    </CardBody>
                </form>
                <CardFooter>
                    <p className="text-small w-full text-center">Do you have an account? Login <Link href='/login' className='pointer-events-auto' underline="always">Here</Link></p>
                </CardFooter>
            </Card>
        </div>
    );
}