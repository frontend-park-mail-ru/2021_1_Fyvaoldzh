import Input from './validation.js';

/**
 * Функция для валидации форм
 * @param {HTMLElement} form - форма для валидации
 * @return {boolean}
 */
const validation = (form) => {
    let isValidationError = false;

    const inputs = form.getElementsByClassName('form__input');
    

    for (const inputItem of inputs) {
        const inputClassItem = new Input(inputItem.name);


        if (!inputClassItem.regex.test(inputItem.value)) {
            inputItem.value = '';
            inputItem.placeholder = inputClassItem.errorMsg;
            isValidationError = true;
        } else {
        }
    }

    return !isValidationError;
};

export default validation;