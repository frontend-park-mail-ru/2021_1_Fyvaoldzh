import {INPUTS} from './validation.js'


/**
 * Функция для валидации форм
 * @param {Object} form - объект с полями для валидации
 * @return {boolean}
 */


export const validation = (formDataObject) => {
    
    let errors = [];
    for (let key in formDataObject) {
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
            case 'email':
                if (!INPUTS.email.regex.test(formDataObject[key])) {
                    errors.push(key);
                }
                break;
            case 'birthday':
                if (!INPUTS.birthday.regex.test(formDataObject[key])) {
                    errors.push(key);
                }
                break;
        }
    }
    return errors;
};