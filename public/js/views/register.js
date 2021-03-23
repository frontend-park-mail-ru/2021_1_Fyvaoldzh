import {storage} from '../main.js'
import {INPUTS} from '../validationModule/validation.js'

function renderValidationErrors(validationErrors) {
    document.getElementById('loginError').innerText = '';  // вопросики
    document.getElementById('passwordError').innerText = '';
    document.getElementById('nicknameError').innerText = '';

    for (let i in validationErrors) { // TODO переделать на foreach()
        switch (validationErrors[i]) {
            case 'login':
                document.getElementById('loginError').innerText = INPUTS.login.errorMsg;

            case 'password':
                document.getElementById('passwordError').innerText = INPUTS.password.errorMsg;

            case 'name':  // Nickname / name исправить все на одно
                document.getElementById('nicknameError').innerText = INPUTS.name.errorMsg;

        }
    }
}

export function renderSignUp(validationErrors) {
    window.scroll(0, 0);
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = signUpFormTemplate({});
    renderValidationErrors(validationErrors);
}