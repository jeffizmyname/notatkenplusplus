interface UserData {
    id: number;
    name: string;
    surname: string;
    email: string;
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