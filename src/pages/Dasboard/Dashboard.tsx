import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftBar from './LeftBar';
import NavBar from './NavBar';
import Content from './Content';

export default function Dashboard() {
    const navigate = useNavigate();
    const data = JSON.parse(sessionStorage.getItem("userData")!)
    console.log(data.name)

    useEffect(() => {
        // Check if the user is not logged in, then navigate to the login page
        if (sessionStorage.getItem("loggedIn") !== "true") {
            navigate('/login');
        }
    }, [navigate]);

//     const userData = () => { 
//     if (data !== null) {
//         const jsonData = JSON.parse(data);
//         const email = jsonData.email
//         console.log(jsonData.email);

//         axios.post('http://192.168.100.245:3001/getUserData', { email })
//             .then(response => {
//                 console.clear();
//                 console.log(JSON.stringify(response));
//             })
//             .catch(error => {
//                 console.clear();
//                 console.log(error);
//             });
//     }
// }

// Render the component content
return (
    <div className='w-screen h-fit bg-zinc-900 overflow-x-hidden'>
        <NavBar/>
        <div className='flex h-[calc(100vh)]'>
            <LeftBar/>
            <Content/>
        </div>

    </div>
);
}

{/* <p>tu kiedyś będzie strona, przysięgam</p>
<Button onClick={() => {
    sessionStorage.setItem("loggedIn", "false");
    navigate('/login');
}}>Log out</Button>
<Button onClick={() => {
    userData()
}}>
    get data
</Button> */}