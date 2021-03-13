const VALIDATION_ERR_MESSAGES = {
    LOGIN: `Логин должен содержать минимум 5 символов латиницы, не содержать знаков препинания, кроме точки.`,
    PASSWORD: `Пароль из минимум 6 символов`,
    EMAIL: 'Неправильный формат электронной почты',
    NAME: `Имя не должно состоять из цифр и знаков препинания`,
    CITY: `Город минимум 3 символа`,
    BIRTHDAY: `День рождения минимум 5 символов`,
};

const INPUTS = {
    'login': {
        regex: /^[a-zA-Z.0-9]{4,}$/,
        inputName: 'login',
        errorMsg: VALIDATION_ERR_MESSAGES.LOGIN,
    },
    'name': {
        regex: /^[a-zA-Zа-яА-Я\s]+$/,
        inputName: 'name',
        errorMsg: VALIDATION_ERR_MESSAGES.NAME,
    },
    'password': {
        regex: /[a-zA-Z0-9.]{6,}$/,
        inputName: 'password',
        errorMsg: VALIDATION_ERR_MESSAGES.PASSWORD,
    },
    'email': {
        regex: /^\S+@\S+\.\S+$/,
        inputName: 'email',
        errorMsg: VALIDATION_ERR_MESSAGES.EMAIL,
    },
    'city': {
        regex: /^[a-zA-Zа-яА-Я\s]+$/,
        inputName: 'city',
        errorMsg: VALIDATION_ERR_MESSAGES.CITY,
    },
    'birthday': {
        regex: /^[a-zA-Z][a-zA-Z0-9]{4,}$/,
        inputName: 'birthday',
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