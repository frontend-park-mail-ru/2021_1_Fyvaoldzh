import Input from './validation.js';

/**
 * Функция для валидации форм
 * @param {HTMLElement} form - форма для валидации
 * @return {boolean}
 */
const validation = (form) => {
    let isValidationError = false;

    const inputs = form.getElementsByClassName('form__input');


    document.getElementById('loginError').innerText = '';
    document.getElementById('passwordError').innerText = '';
    //document.getElementById('nicknameError').innerText = '';

    
    

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