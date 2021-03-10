import {
  getLoggedProfileData, putAvatar,
  postRegistationData, postLoginData,
} from './libs/network/network.js';
import {
  imgUrl, renderLoggedNavbar, renderLoginPage, renderEvents,
} from './libs/render/render.js';

import validation from './libs/validation/inputValidation.js';
import { init, urlMap } from './libs/initial/initial.js';

// wrapper.innerHTML = upperTextTemplate({});

const wrapper = document.getElementById('wrapper');

const { body } = document;

body.addEventListener('click', async (e) => {
  const { target } = e;
  // console.log(Object.prototype.toString.call(target));

  if (Object.prototype.toString.call(target) === '[object HTMLAnchorElement]') {
    e.preventDefault();
    urlMap[target.dataset.direction](target.id);
  }

  if (Object.prototype.toString.call(target) === '[object HTMLButtonElement]') {
    e.preventDefault();
    const formBody = document.getElementById('formBody');

    // console.log(Object.prototype.toString.call(formBody));

    if (target.id === 'postRegistration') {
      const dataFromForm = new FormData(formBody);
      if (validation(formBody)) {
        // console.log(validation(formBody));
        const jsonData = JSON.stringify(Object.fromEntries(dataFromForm));
        const answer = await postRegistationData(jsonData);
        if (answer.ok) {
          renderLoginPage();
        } else {
          const errorSignupT = errorSignupTemplate();
          wrapper.insertAdjacentHTML('beforeend', errorSignupT);
        }
      }
    }

    if (target.id === 'postLogin') {
      const dataFromForm = new FormData(formBody);
      if (validation(formBody)) {
        const jsonData = JSON.stringify(Object.fromEntries(dataFromForm));
        const answer = await postLoginData(jsonData);
        // console.log(answer);
        if (answer.ok) {
          renderLoggedNavbar();
          renderEvents();
        } else {
          const errorLoginT = errorLoginTemplate();
          wrapper.insertAdjacentHTML('beforeend', errorLoginT);
        }
      }
    }

    if (target.id === 'postProfile') {
      // const dataSpanForm = new FormData(target.parentNode);
      if (validation(target.parentNode)) {
        // const dataSpanFormJson = JSON.stringify(Object.fromEntries(dataSpanForm));
        // console.log(dataSpanFormJson);
        // const postProfileAnswer = await postProfileData(dataSpanFormJson);
        renderLoggedNavbar();
      }
    }

    if (target.id === 'postAvatarProfile') {
      const avatarInput = document.getElementById('imageFile');
      if (!avatarInput.value) {
        alert('Не выбран аватар');
      } else {
        const photo = avatarInput.files[0];
        const formPut = new FormData();
        formPut.append('avatar', photo);
        // console.log(formPut);
        const answ = await putAvatar(formPut);
        if (answ.ok) {
          const loginCheck = await getLoggedProfileData();
          const profileInfo = await loginCheck.json();
          // const navbarRow = document.getElementById('navbarRow');

          const navbarAvatar = document.getElementById('navbar-avatar');
          const avaProfile = document.getElementById('profileAvatar');

          fetch(`${imgUrl + profileInfo.Uid}`).then((response) => response.blob()).then((blob) => {
            const reader = new FileReader();
            reader.onload = function () {
              navbarAvatar.style.background = `url(${this.result}) no-repeat center / cover`;
              avaProfile.style.background = `url(${this.result}) no-repeat center / cover`;
            };
            reader.readAsDataURL(blob);
          });
        } else {
          // alert('неведомая ошибка');
        }
      }
    }
  }
});

init();
