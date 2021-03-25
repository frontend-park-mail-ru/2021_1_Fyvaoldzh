'use strict';

import {getAllEventsJson, getLoggedProfileData, postProfileData, putAvatar} from './networkModule/network.js';
import {imgUrl, renderEventsList, renderProfilePage} from './renderModule/render.js';
import {postRegistationData} from './networkModule/network.js';
import {postLoginData} from './networkModule/network.js';
import validation from './validationModule/inputValidation.js';
import {init} from './initialModule/initial.js';
import {renderLoggedNavbar, renderLoginPage, renderEvents} from './renderModule/render.js';

const wrapper = document.getElementById('wrapper'); //почему document находит index.html??????

//wrapper.innerHTML = upperTextTemplate({});

const body = document.body;

import {urlMap} from '../js/initialModule/initial.js';

const SERVER_ERRORS = {
  LOGIN: 'Неправильный логин или пароль',
  REGISTRATION: 'Такой логин уже существует',
};

function drawServerError(error) {
  //тут часть валидации типо?????????
  if (document.getElementById('nicknameError')) {
    document.getElementsByName('login').forEach(el => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
    document.getElementById('loginError').style.boxShadow = '0px 0px 10px 0px #CE0E50';
    document.getElementById('nicknameError').innerText = error;
  } else {
    document.getElementsByName('login').forEach(el => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
    document.getElementsByName('password').forEach(el => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
    document.getElementById('passwordError').innerText = error;
  }
}

body.addEventListener('click', async e => {
  const navbarCheckbox = document.getElementById('toggle');
  const {target} = e; //target = e.target??????????????????????????????????

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
    urlMap[target.dataset.direction](target.id); //в соответствующую ф-цию рендера передаем target.id (но он не является параметром ни в одной)?????
  }

  if (Object.prototype.toString.call(target) === '[object HTMLButtonElement]') {
    e.preventDefault();
    const formBody = document.getElementById('formBody');

    if (target.id === 'postRegistration') {
      let dataFromForm = new FormData(formBody);
      if (validation(formBody)) {
        console.log(validation(formBody));
        let jsonData = JSON.stringify(Object.fromEntries(dataFromForm));
        let answer = await postRegistationData(jsonData);
        if (answer.ok) {
          renderEvents();
          renderLoggedNavbar();
        } else {
          drawServerError(SERVER_ERRORS.REGISTRATION);
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
          drawServerError(SERVER_ERRORS.LOGIN);
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
        formPut.append('avatar', photo);
        console.log(formPut);
        let answ = await putAvatar(formPut);
        if (answ.ok) {
          let loginCheck = await getLoggedProfileData();
          let profileInfo = await loginCheck.json();
          let navbarRow = document.getElementById('navbarRow');

          let navbarAvatar = document.getElementById('navbar-avatar');
          let avaProfile = document.getElementById('profileAvatar');

          fetch(`${imgUrl + profileInfo.Uid}`)
            .then(response => response.blob())
            .then(blob => {
              const reader = new FileReader();
              reader.onload = function () {
                navbarAvatar.style.background = `url(${this.result}) no-repeat center / cover`;
                avaProfile.style.background = `url(${this.result}) no-repeat center / cover`;
              };
              reader.readAsDataURL(blob);
            });
        } else {
          //alert('неведомая ошибка');
        }
      }
    }
  }
});
init();
