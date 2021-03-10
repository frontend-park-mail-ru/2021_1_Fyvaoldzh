const VALIDATION_ERR_MESSAGES = {
    LOGIN: `Логин должен содержать минимум 5 символов`,
    PASSWORD: `Пароль из минимум 6 символов`,
    EMAIL: 'Неправильный формат электронной почты',
    NAME: `Имя из минимум 5 символов`,
    CITY: `Город минимум 3 символа`,
    BIRTHDAY: `День рождения минимум 5 символов`,
};

const INPUTS = {
    'login': {
        regex: /^[a-zA-Z][a-zA-Z0-9]{4,}$/,
        inputName: 'login',
        errorMsg: VALIDATION_ERR_MESSAGES.LOGIN,
    },
    'name': {
        regex: /[^A-zА-я]{4,}/,
        inputName: 'name',
        errorMsg: VALIDATION_ERR_MESSAGES.NAME,
    },
    'password': {
        regex: /[a-zA-Z0-9]{6,}$/,
        inputName: 'password',
        errorMsg: VALIDATION_ERR_MESSAGES.PASSWORD,
    },
    'email': {
        regex: /^\S+@\S+\.\S+$/,
        inputName: 'email',
        errorMsg: VALIDATION_ERR_MESSAGES.EMAIL,
    },
    'city': {
        regex: /^[a-zA-Z][a-zA-Z0-9]{4,}$/,
        inputName: 'name',
        errorMsg: VALIDATION_ERR_MESSAGES.CITY,
    },
    'birthday': {
        regex: /^[a-zA-Z][a-zA-Z0-9]{4,}$/,
        inputName: 'name',
        errorMsg: VALIDATION_ERR_MESSAGES.BIRTHDAY,
    },
    
};

export default class Input {
    constructor(inputID) {
        ({
            regex: this.regex,
            inputName: this.inputName,
            errorMsg: this.errorMsg,
        } = INPUTS[inputID]);
    }
}