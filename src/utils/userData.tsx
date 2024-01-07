import axios from "axios";

interface UserData {
    id: number;
    name: string;
    surname: string;
    email: string;
}

export function prepData(email: string) {
    axios.post('http://192.168.100.245:3001/getUserData', { email })
    .then(response => {
        sessionStorage.setItem("userData", JSON.stringify(response.data.user))
        console.clear();
        console.log(sessionStorage.getItem("userData"));
    })
    .catch(error => {
        console.clear();
        console.log(error);
    });
}

const getData = (): UserData | null => {
    const data = sessionStorage.getItem("userData")

    if(data !== null) {
        return JSON.parse(data) as UserData
    }

    return null
}

export function getId(): number | null {
    const userData = getData()

    if(userData !== null) {
        return userData.id
    }

    return null
}

export function getName(): string | null {
    const userData = getData()

    if(userData !== null) {
        return userData.name
    }

    return null
}

export function getSurname(): string | null {
    const userData = getData()

    if(userData !== null) {
        return userData.surname
    }

    return null
}

export function getEmail(): string | null {
    const userData = getData()

    if(userData !== null) {
        return userData.email
    }

    return null
}