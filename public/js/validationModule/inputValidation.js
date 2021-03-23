import {INPUTS} from './validation.js'
/**
 * Функция для валидации форм
 * @param {HTMLElement} form - форма для валидации
 * @return {boolean}
 */

 

export const validation = (formDataObject) => {
    
    let errors = [];
    /*
    document.getElementById('loginError') ? document.getElementById('loginError').innerText = '' : null;
    document.getElementById('passwordError') ? document.getElementById('passwordError').innerText = '' : null;
    document.getElementById('nicknameError') ? document.getElementById('nicknameError').innerText = '' : null;

    inputItem.style.boxShadow = '0px 0px 10px 0px #CE0E50';
                     document.getElementById('nicknameError').innerText = inputClassItem.errorMsg;
                    break;
    */

    for (let key in formDataObject) {
        console.log(formDataObject[key]);
        switch (key) {
            case 'login':
                if (!INPUTS.login.regex.test(formDataObject[key])) {
                    errors.push(key);
                }
                break;
            case 'password':
                if (!INPUTS.password.regex.test(formDataObject[key])) {
                    errors.push(key);
                }
                break;
            case 'name':
                if (!INPUTS.name.regex.test(formDataObject[key])) {
                    errors.push(key);
                }
                break;
        }
    }
    return errors;
};