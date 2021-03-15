import Input from './validation.js';

/**
 * Функция для валидации форм
 * @param {HTMLElement} form - форма для валидации
 * @return {boolean}
 */
const validation = (form) => {
    let isValidationError = false;

    const inputs = form.getElementsByClassName('form__input');


    document.getElementById('loginError') ? document.getElementById('loginError').innerText = '' : null;
    document.getElementById('passwordError') ? document.getElementById('passwordError').innerText = '' : null;
    document.getElementById('nicknameError') ? document.getElementById('nicknameError').innerText = '' : null;
    

    for (const inputItem of inputs) {
        const inputClassItem = new Input(inputItem.name);

        inputItem.style.boxShadow = null;
        if (!inputClassItem.regex.test(inputItem.value)) {
            switch(inputItem.name) {
                case 'login':
                    inputItem.style.boxShadow = '0px 0px 10px 0px #CE0E50';
                    document.getElementById('loginError').innerText = inputClassItem.errorMsg;
                    break;
                case 'password':
                    inputItem.style.boxShadow = '0px 0px 10px 0px #CE0E50';
                    document.getElementById('passwordError').innerText = inputClassItem.errorMsg;
                    break;
                case 'name':
                    inputItem.style.boxShadow = '0px 0px 10px 0px #CE0E50';
                     document.getElementById('nicknameError').innerText = inputClassItem.errorMsg;
                    break;
            }
            isValidationError = true;
        } else {
        }
    }

    return !isValidationError;
};

export default validation;