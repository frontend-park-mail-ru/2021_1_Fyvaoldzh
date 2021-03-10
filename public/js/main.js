'use strict';

import {getAllEventsJson, getLoggedProfileData, postProfileData, putAvatar} from './networkModule/network.js';
import {getEventById} from './networkModule/network.js';
import {postRegistationData} from './networkModule/network.js';
import {postLoginData} from './networkModule/network.js';
import {logoutFunc} from './networkModule/network.js';
import validation from './validationModule/inputValidation.js';
import {init} from './initialModule/initial';

const wrapper = document.getElementById('wrapper');

//wrapper.innerHTML = upperTextTemplate({});

const body = document.body;

body.addEventListener('click', async e => {
    const {target} = e;
    console.log(Object.prototype.toString.call(target));

    if (Object.prototype.toString.call(target) === '[object HTMLAnchorElement]') {
        e.preventDefault();
        urlMap[target.dataset.direction](target.id);
    }

    if (Object.prototype.toString.call(target) === '[object HTMLButtonElement]') {
        e.preventDefault();
        const formBody = document.getElementById('formBody');

        console.log(Object.prototype.toString.call(formBody));
        

        
        if (target.id === 'postRegistration') {
            let dataFromForm = new FormData(formBody);
            if (validation(formBody)) {
                console.log(validation(formBody));
                let jsonData = JSON.stringify(Object.fromEntries(dataFromForm));
                let answer = await postRegistationData(jsonData);
                if (answer.ok) {
                    renderLoggedNavbar();
                    renderEvents();
                } else {
                    alert('Такой логин уже существует'); // TODO Максим, добавь какую-нибудь обработку
                }
            }
        }

        if (target.id === 'postLogin') {
            let dataFromForm = new FormData(formBody);
            if (validation(formBody)) {
                let jsonData = JSON.stringify(Object.fromEntries(dataFromForm));
                let answer = await postLoginData(jsonData);
                console.log(answer);
                if (answer.ok) {
                    renderLoggedNavbar();
                    renderEvents();
                } else {

                    alert('Неверный логин или пароль'); // TODO Максим, добавь какую-нибудь обработку
                }
            }
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
                    alert('неведомая ошибка');
                }
            }
        }
    }
});

init();