import { pageNames, channelNames, urlMap, SERVER_ERRORS } from '../../config/config.js';
import { INPUTS } from '../../validationModule/validation.js';

export default class UserView {
  constructor({eventBus, userStore, globalStore}) {
    this.eventBus = eventBus;
    this.userStore = userStore;
    this.globalStore = globalStore;
  }

  renderLoggedNavbar() {
    window.scroll(0, 0);

    const profileData = this.userStore.getData();
    navbar.innerHTML = '';
    navbar.innerHTML = navbarLoggedTemplate(profileData);
    const navbarAvatar = document.getElementById('navbar-avatar');

    navbarAvatar.style.background = `url(${urlMap.imgUrl + profileData.Uid}) no-repeat center / cover`;
  }

  renderValidationErrors() {
    const validationErrors = this.userStore.getValidationErrors();

    document.getElementById('loginError').innerText = '';  // вопросики
    document.getElementById('passwordError').innerText = '';
    if (document.getElementById('nicknameError')) {
      document.getElementById('nicknameError').innerText = '';
    }

    document.getElementsByName('login').forEach(el => el.style = null);
    document.getElementsByName('password').forEach(el => el.style = null);
    document.getElementsByName('name').forEach(el => el.style = null);

    for (let i in validationErrors) { // TODO переделать на foreach() (если возможно)
      switch (validationErrors[i]) {
        case 'login':
          document.getElementsByName('login').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
          document.getElementById('loginError').innerText = INPUTS.login.errorMsg;
          break;

        case 'password':
          document.getElementsByName('password').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
          document.getElementById('passwordError').innerText = INPUTS.password.errorMsg;
          break;

        case 'name':  // Nickname / name исправить все на одно
          document.getElementsByName('name').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
          document.getElementById('nicknameError').innerText = INPUTS.name.errorMsg;
          break;

        case 'loginExist':
          document.getElementsByName('login').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
          document.getElementById('nicknameError').innerText = SERVER_ERRORS.LOGIN_EXIST;
          break;

        case 'wrongLoginOrPass':
          document.getElementsByName('login').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
          document.getElementsByName('password').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
          document.getElementById('passwordError').innerText = SERVER_ERRORS.WRONG_LOGIN_OR_PASS;

      }
    }
  }

  renderMyProfilePage() {
    if (this.globalStore.getCurrentPage() !== pageNames.profilePage) {
      return;
    }

    window.scroll(0, 0);
    const profileData = this.userStore.getData();

    wrapper.style.background = 'url("components/img/my-profile-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = myProfileTemplate(profileData);

    let ava = document.getElementById('profileAvatar');
    ava.style.background = `url(${urlMap.imgUrl + profileData.Uid}) no-repeat`;
    document.getElementById('imageFile').addEventListener('change', handleFileSelect);
  }

  subscribeViews() {
    this.eventBus.subscribe(channelNames.errorValidation, this.renderValidationErrors.bind(this));
    this.eventBus.subscribe(channelNames.userUpdated, this.renderLoggedNavbar.bind(this));
    this.eventBus.subscribe(channelNames.userUpdated, this.renderMyProfilePage.bind(this));
  }
}

function handleFileSelect(e) {
  const file = e.target.files[0]; 
  // Только изображения.
  if (!file.type.match('image.*')) {
    alert("Image only please....");
  }
  const reader = new FileReader();
  // Closure to capture the file information.

  reader.onload = function(evnt) {
    console.log(evnt.target.result);
    let ava = document.getElementById('profileAvatar');
    ava.style.background = `url(${evnt.target.result}) no-repeat center / cover`;
  }

  reader.readAsDataURL(file);
}