const checkLength = (string, min, max) => max ? string.length >= min && string.length <= max : string.length >= min;

export const passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
const checkUsernameLength = username => checkLength(username, 6);
const checkPasswordLength = password => checkLength(password, 8, 15);
const checkPasswordRegEx = password => passwordPattern.test(password);

const REQ = "Required";
const USERNAME_LEN_REQ = "Must be from 6 chars long";
const PASSWORD_LEN_REQ = "Must be from 8 to 15 chars long";
const PASSWORD_REG_EX = "Must contain at leat 1 uppercase, 1 lowercase, 1 digit and 1 special character";
const MATCH_ERR = "Passwords do not match";

export const loginValidate = values => {
    const error = {};
    if (!values.username) {
        error.username = REQ;
    } else if (!checkUsernameLength(values.username)) {
        error.username = USERNAME_LEN_REQ
    }

    if (!values.password) {
        error.password = REQ;
    } else if (!checkPasswordLength(values.password)) {
        error.password = PASSWORD_LEN_REQ;
    }
    return error;
}

export const registerValidate = values => {
    const error = {}
    if (!values.username) {
        error.username = REQ;
    } else if (!checkUsernameLength(values.username)) {
        error.username = USERNAME_LEN_REQ;
    }

    if (!values.password) {
        error.password = REQ;
    } else if (!checkPasswordLength(values.password)) {
        error.password = PASSWORD_LEN_REQ;
    } else if (!checkPasswordRegEx(values.password)) {
        error.password = PASSWORD_REG_EX;
    }

    if (!values.confirmPassword) {
        error.confirmPassword = REQ;
    } else if (values.password !== values.confirmPassword) {
        error.confirmPassword = MATCH_ERR;
    }
    return error;
}

export const gradePassword = (password, confirmPassword) => {
    let score = 0;
    if (password) {
        score += checkPasswordLength(password) && 1;
        score += checkPasswordRegEx(password) && 1;
    }
    if (confirmPassword && password === confirmPassword) score++;
    return score;
}


export const itemValidate = values => {

}

