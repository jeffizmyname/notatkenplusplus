import React, { useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is not logged in, then navigate to the login page
        if (sessionStorage.getItem("loggedIn") !== "true") {
            navigate('/login');
        }
    }, [navigate]);

    // Render the component content
    return (
        <>
            <p>tu kiedyś będzie strona, przysięgam</p>
            <Button onClick={() => {
                sessionStorage.setItem("loggedIn", "false");
                navigate('/login');
            }}>Log out</Button>
        </>
    );
}