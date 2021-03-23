'use strict';

import {getAllEventsJson, getLoggedProfileData, postProfileData, putAvatar} from './networkModule/network.js';
import {imgUrl} from './renderModule/render.js';
import {postRegistrationData} from './networkModule/network.js';
import {postLoginData} from './networkModule/network.js';
import {validation} from './validationModule/inputValidation.js';


const wrapper = document.getElementById('wrapper');
const body = document.body;

/////////////
import {Dispatcher} from './dispatcher/dispatcher.js'
import { actions } from './actions/actions.js';

import {Store} from './storage/storage.js'
import {subscribeViews} from './views/register.js'

export const dispatcher = new Dispatcher();
subscribeViews();

for (let key in Store.storeMethods) {
    dispatcher.register(Store.storeMethods[key]);  // Подписываем все методы хранилища на экшны.
}
navbar.innerHTML = navbarTemplate({});
actions.updateUser();
actions.changePage('events');


const SERVER_ERRORS = {
    LOGIN: 'Неправильный логин или пароль',
    REGISTRATION: 'Такой логин уже существует',
}

function drawServerError(error) {
    if (document.getElementById('nicknameError')) {
        document.getElementsByName('login').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
        document.getElementById('loginError').style.boxShadow = '0px 0px 10px 0px #CE0E50';
        document.getElementById('nicknameError').innerText = error;
    } else {
        document.getElementsByName('login').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
        document.getElementsByName('password').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
        document.getElementById('passwordError').innerText = error;
    }
}

body.addEventListener('click', async e => {
    const navbarCheckbox = document.getElementById('toggle');
    const {target} = e;
    //console.log(Object.prototype.toString.call(target));

    /*if (Object.prototype.toString.call(target) !== '[object HTMLInputElement]') {
        // Сворачивание открытого профиля навбарчика при нажатии куда-либо
        navbarCheckbox.checked = false;
    }

    if (Object.prototype.toString.call(target) === '[object HTMLInputElement]') {
        console.log(navbarCheckbox.checked)
        navbarCheckbox.checked = !navbarCheckbox.checked;
    }
    */

    if (Object.prototype.toString.call(target) === '[object HTMLAnchorElement]') {
        e.preventDefault();
        
        switch (target.dataset.direction) {
            case 'logout':
                actions.logout();
                console.log('adjkwadkjda');
                break;

            case 'eventPage':
                actions.eventPage(target.id);

            default:
                actions.changePage(target.dataset.direction);
        }
    }

    if (Object.prototype.toString.call(target) === '[object HTMLButtonElement]') {
        e.preventDefault();
        const formBody = document.getElementById('formBody');
        
        if (target.id === 'postRegistration') {
            const dataFromForm = new FormData(formBody);
            const objectDataForm = Object.fromEntries(dataFromForm);            
            actions.register(objectDataForm);
        }

        if (target.id === 'postLogin') {
            const dataFromForm = new FormData(formBody);
            const objectDataForm = Object.fromEntries(dataFromForm);
            actions.login(objectDataForm);
        }

        if (target.id === 'postProfile') {
            let dataSpanForm = new FormData(target.parentNode);
            if (validation(target.parentNode)) {
                let dataSpanFormJson = JSON.stringify(Object.fromEntries(dataSpanForm));
                console.log(dataSpanFormJson);
                let postProfileAnswer = await postProfileData(dataSpanFormJson);
                renderLoggedNavbar();
            }
        }

        if (target.id === 'postAvatarProfile') {
            let avatarInput = document.getElementById('imageFile');
            if (!avatarInput.value) {
                alert('Не выбран аватар');
            } else {
                let photo = avatarInput.files[0];
                let formPut = new FormData();
                formPut.append("avatar", photo);
                console.log(formPut);
                let answ = await putAvatar(formPut);
                if (answ.ok) {
                    let loginCheck = await getLoggedProfileData();
                    let profileInfo = await loginCheck.json();
                    let navbarRow = document.getElementById('navbarRow');

                    let navbarAvatar = document.getElementById('navbar-avatar');
                    let avaProfile = document.getElementById('profileAvatar');
                    
                    fetch(`${imgUrl + profileInfo.Uid}`).then((response) => response.blob()).then(blob => {
                        const reader = new FileReader() ;
                        reader.onload = function() { navbarAvatar.style.background = `url(${this.result}) no-repeat center / cover`
                                                     avaProfile.style.background = `url(${this.result}) no-repeat center / cover`};
                        reader.readAsDataURL(blob) ;
                    }) ;
                } else {
                    //alert('неведомая ошибка');
                }
            }
        }
        
    }
});