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

export function HandleValidation(fields: Fields): Errors {

    const formFields = { ...fields };
    const formErrors: Errors = {};
    let formIsValid = true;

    //Name
    if (!formFields["name"]) {
        formIsValid = false;
        formErrors["name"] = "Nie moze być puste";
    }

    if (formFields["name"] !== "") {
        if (!formFields["name"]?.match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            formErrors["name"] = "Tylko litery";
        }
    }

    //SurName
    if (!formFields["surName"]) {
        formIsValid = false;
        formErrors["surName"] = "Nie moze być puste";
    }

    if (typeof formFields["surName"] !== "undefined") {
        if (!formFields["surName"].match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            formErrors["surName"] = "Tylko litery";
        }
    }

    //Email
    if (!formFields["email"]) {
        formIsValid = false;
        formErrors["email"] = "Nie moze być puste";
    }

    if (formFields["email"] !== null) {
        const lastAtPos = formFields["email"]?.lastIndexOf('@');
        const lastDotPos = formFields["email"]?.lastIndexOf('.');

        if(typeof lastAtPos === 'number' && typeof lastDotPos  === 'number') {
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && formFields["email"]?.indexOf('@@') == -1 && lastDotPos > 2 && (fields?.["email"]?.length ?? 0 - lastDotPos) > 2)) {
            formIsValid = false;
            formErrors["email"] = "Email jest nieprawidłowy";
        }
        }
    }

    //password
    if(!formFields["password"]) {
        formIsValid = false;
        formErrors["password"] = "Nie moze być puste";
    } 

    if (formFields["password"] !== null) {

        if (formFields["password"]?.length && formFields["password"].length < 8) {
            formIsValid = false;
            formErrors["password"] = 'Hasło musi zawierać conajmniej 8 znaków';
        }

        // Regular expressions for additional criteria
        const hasUpperCase = /[A-Z]/.test(formFields["password"] || 'def');
        const hasLowerCase = /[a-z]/.test(formFields["password"] || 'def');
        const hasDigit = /\d/.test(formFields["password"] || 'def');
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formFields["password"] || 'def');

        // Check additional criteria
        if (!hasUpperCase) {
            formIsValid = false;
            formErrors["password"] = 'Hasło musi zawierać conajmniej jedna dużą literke';
        }

        if (!hasLowerCase) {
            formIsValid = false;
            formErrors["password"] = 'Hasło musi zawierać conajmniej jedną małą literkę';
        }

        if (!hasDigit) {
            formIsValid = false;
            formErrors["password"] = 'Hasło musi zawierać conajmniej jedną cyfre';
        }

        if (!hasSpecialChar) {
            formIsValid = false;
            formErrors["password"] = 'Hasło musi zawierać conajmniej jedn znak specjalny';
        }
    }

    if(formFields["passwordRep"] !== formFields["password"] && formFields["passwordRep"] != "") {
        formIsValid = false;
        formErrors["passwordRep"] = "Hasła się nie zgadzaja";
    }
    
    if(!formFields["passwordRep"]) {
        formIsValid = false;
        formErrors["passwordRep"] = "Nie moze być puste";
    }

    if(formIsValid) {
        console.log("valid")
    }

    return formErrors;
}