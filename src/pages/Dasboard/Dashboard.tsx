import React, { useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    const navigate = useNavigate();
    const data = sessionStorage.getItem("userData")

    useEffect(() => {
        // Check if the user is not logged in, then navigate to the login page
        if (sessionStorage.getItem("loggedIn") !== "true") {
            navigate('/login');
        }
    }, [navigate]);

    const userData = () => { 
    if (data !== null) {
        const jsonData = JSON.parse(data);
        const email = jsonData.email
        console.log(jsonData.email);

        axios.post('http://localhost:3001/getUserData', { email })
            .then(response => {
                console.clear();
                console.log(JSON.stringify(response));
            })
            .catch(error => {
                console.clear();
                console.log(error);
            });
    }
}

// Render the component content
return (
    <>
        <p>tu kiedyś będzie strona, przysięgam</p>
        <Button onClick={() => {
            sessionStorage.setItem("loggedIn", "false");
            navigate('/login');
        }}>Log out</Button>
        <Button onClick={() => {
            userData()
        }}>
            get data
        </Button>
    </>
);
}