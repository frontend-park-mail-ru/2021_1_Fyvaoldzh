const VALIDATION_ERR_MESSAGES = {
    LOGIN: `Логин должен содержать минимум 5 символов`,
    PASSWORD: `Пароль из минимум 6 символов`,
    EMAIL: 'Неправильный формат электронной почты',
    TAB_ADD: 'Название плейлиста не должно быть пустым',
    NAME: `Имя из минимум 5 символов`,
};

const INPUTS = {
    'login': {
        regex: /^[a-zA-Z][a-zA-Z0-9]{4,}$/,
        inputName: 'login',
        errorMsg: VALIDATION_ERR_MESSAGES.LOGIN,
    },
    'name': {
        regex: /^[a-zA-Z][a-zA-Z0-9]{4,}$/,
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