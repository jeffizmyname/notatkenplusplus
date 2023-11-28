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
        formErrors["name"] = "Cannot be empty";
    }

    if (formFields["name"] !== "") {
        if (!formFields["name"]?.match(/^[a-zA-Z]+$/)) {
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

    if (formFields["email"] !== null) {
        const lastAtPos = formFields["email"]?.lastIndexOf('@');
        const lastDotPos = formFields["email"]?.lastIndexOf('.');

        if(typeof lastAtPos === 'number' && typeof lastDotPos  === 'number') {
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && formFields["email"]?.indexOf('@@') == -1 && lastDotPos > 2 && (fields?.["email"]?.length ?? 0 - lastDotPos) > 2)) {
            formIsValid = false;
            formErrors["email"] = "Email is not valid";
        }
        }
    }

    //password
    if(!formFields["password"]) {
        formIsValid = false;
        formErrors["password"] = "Cannot be empty";
    } 

    if (formFields["password"] !== null) {

        if (formFields["password"]?.length && formFields["password"].length < 8) {
            formIsValid = false;
            formErrors["password"] = 'Password must be at least 8 characters long';
        }

        // Regular expressions for additional criteria
        const hasUpperCase = /[A-Z]/.test(formFields["password"] || 'def');
        const hasLowerCase = /[a-z]/.test(formFields["password"] || 'def');
        const hasDigit = /\d/.test(formFields["password"] || 'def');
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formFields["password"] || 'def');

        // Check additional criteria
        if (!hasUpperCase) {
            formIsValid = false;
            formErrors["password"] = 'Password must contain at least one uppercase letter';
        }

        if (!hasLowerCase) {
            formIsValid = false;
            formErrors["password"] = 'Password must contain at least one lowercase letter';
        }

        if (!hasDigit) {
            formIsValid = false;
            formErrors["password"] = 'Password must contain at least one digit';
        }

        if (!hasSpecialChar) {
            formIsValid = false;
            formErrors["password"] = 'Password must contain at least one special character';
        }
    }

    if(formFields["passwordRep"] !== formFields["password"] && formFields["passwordRep"] != "") {
        formIsValid = false;
        formErrors["passwordRep"] = "The passwords dont match";
    }
    
    if(!formFields["passwordRep"]) {
        formIsValid = false;
        formErrors["passwordRep"] = "Cannot be empty";
    }

    if(formIsValid) {
        console.log("valid")
    }

    return formErrors;
}