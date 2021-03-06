import INPUTS from './validation';

/**
 * Функция для валидации форм
 * @return {boolean}
 * @param formDataObject
 */

const validation = (formDataObject: object) => {
  const errors: Array<string> = [];

  Object.entries(formDataObject).forEach(([key, val]) => {
    switch (key) {
      case 'login':
        if (!INPUTS.login.regex.test(val)) {
          errors.push(key);
        }
        break;
      case 'password':
        if (!INPUTS.password.regex.test(val)) {
          errors.push(key);
        }
        break;
      case 'name':
        if (!INPUTS.name.regex.test(val)) {
          errors.push(key);
        }
        break;
      case 'email':
        if (!INPUTS.email.regex.test(val)) {
          errors.push(key);
        }
        break;
      case 'birthday':
        if (!INPUTS.birthday.regex.test(val)) {
          errors.push(key);
        }
        break;
      default:
        break;
    }
  });

  return errors;
};

export default validation;
