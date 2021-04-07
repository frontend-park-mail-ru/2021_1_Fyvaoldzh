/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import {pageNames, channelNames, urlMap, SERVER_ERRORS} from '../../config/config.js';
import INPUTS from '../../validationModule/validation.js';
import {
  renderEventsList,
  addDeclensionOfNumbers,
  buttonToggleHandler,
} from '../../allProfilesUtils/allProfilesUtils.js';

const globalStoreSymbol = Symbol('globalStoreSymbol');
const actionsSymbol = Symbol('actionsSymbol');

export default class UserView {
  constructor({globalStore, actions}) {
    this[globalStoreSymbol] = globalStore;
    this[actionsSymbol] = actions;
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  get actions() {
    return this[actionsSymbol];
  }

  renderEventsList = renderEventsList; //так вообще нормально?

  handleFileSelect(e) {
    const file = e.target.files[0];
    // Только изображения.
    if (!file.type.match('image.*')) {
      alert('Image only please....'); // TODO переделать алерт, добавить поле ошибки под аватарку.
      return;
    }
    const reader = new FileReader();
    // Closure to capture the file information.

    reader.onload = evnt => {
      this.actions.avatarPreview(evnt.target.result);
    };

    reader.readAsDataURL(file);
  }

  renderLoggedNavbar() {
    window.scroll(0, 0);

    const navbar = document.getElementById('navbar');
    const profileData = this.globalStore.userStore.userData;

    navbar.innerHTML = '';
    navbar.innerHTML = navbarLoggedTemplate(profileData);
    const navbarAvatar = document.getElementById('navbar-avatar');

    navbarAvatar.style.background = `url(${urlMap.imgUrl + profileData.Uid}) no-repeat center / cover`;
  }

  renderValidationErrors() {
    const {validationErrors} = this.globalStore.userStore;

    if (document.getElementById('loginError')) {
      document.getElementById('loginError').innerText = '';
    }

    if (document.getElementById('passwordError')) {
      document.getElementById('passwordError').innerText = '';
    }

    if (document.getElementById('nicknameError')) {
      document.getElementById('nicknameError').innerText = '';
    }

    if (document.getElementById('birthdayError')) {
      document.getElementById('birthdayError').innerText = '';
    }

    if (document.getElementById('emailError')) {
      document.getElementById('emailError').innerText = '';
    }

    document.getElementsByName('login').forEach(el => (el.style = null));
    document.getElementsByName('password').forEach(el => (el.style = null));
    document.getElementsByName('name').forEach(el => (el.style = null));
    document.getElementsByName('birthday').forEach(el => (el.style = null));
    document.getElementsByName('city').forEach(el => (el.style = null));
    document.getElementsByName('email').forEach(el => (el.style = null));

    validationErrors.forEach(error => {
      switch (error) {
        case 'login':
          document.getElementsByName('login').forEach(el => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('loginError').innerText = INPUTS.login.errorMsg;
          break;

        case 'password':
          document.getElementsByName('password').forEach(el => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('passwordError').innerText = INPUTS.password.errorMsg;
          break;

        case 'name': // Nickname / name исправить все на одно
          document.getElementsByName('name').forEach(el => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('nicknameError').innerText = INPUTS.name.errorMsg;
          break;

        case 'loginExist':
          document.getElementsByName('login').forEach(el => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('nicknameError').innerText = SERVER_ERRORS.LOGIN_EXIST;
          break;

        case 'wrongLoginOrPass':
          document.getElementsByName('login').forEach(el => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementsByName('password').forEach(el => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('passwordError').innerText = SERVER_ERRORS.WRONG_LOGIN_OR_PASS;
          break;

        case 'birthday':
          document.getElementsByName('birthday').forEach(el => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('birthdayError').innerText = INPUTS.birthday.errorMsg;
          break;

        case 'email':
          document.getElementsByName('email').forEach(el => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('emailError').innerText = INPUTS.email.errorMsg;
          break;

        default:
          break;
      }
    });
  }

  renderProfilePage() {
    if (this.globalStore.currentPage !== pageNames.profilePage) {
      return;
    }

    // this.actions.updateUserEvents(); //не успевает обновиться до первой отрисовки(поэтому сейчас в UserStore внутри update() вызывается updateEvents())

    window.scroll(0, 0);
    const {userData} = this.globalStore.userStore;

    const wrapper = document.getElementById('wrapper');
    wrapper.style.background = 'url("templates/profile/img/profile-background.jpg") no-repeat top / 100%';

    userData.followers += addDeclensionOfNumbers(userData.followers, [
      ' подписчик',
      ' подписчика',
      ' подписчиков',
    ]);

    wrapper.innerHTML = '';
    wrapper.innerHTML = profileTemplate(userData);

    const avatar = document.getElementById('profileAvatar');
    avatar.style.background = `url(${urlMap.imgUrl + userData.Uid}) no-repeat center / cover`;

    document.getElementById('imageFile').addEventListener('change', this.handleFileSelect.bind(this));
    document
      .getElementById('jsSubmitAvatar')
      .addEventListener('click', this.actions.pushAvatar.bind(this.actions));
    document
      .getElementById('jsDeclineAvatar')
      .addEventListener('click', this.actions.declineAvatar.bind(this.actions));

    const tabsBlock = document.getElementById('jsTabsBlock');

    tabsBlock.addEventListener('click', buttonToggleHandler.bind(this));

    this.renderChangingContent();
    window.history.pushState('', '', '/profile');
  }

  renderChangingContent() {
    // console.log(this.globalStore.userStore.currentTab);
    const {currentTab} = this.globalStore.userStore;
    const {userData} = this.globalStore.userStore;

    const changingContent = document.getElementById('changing-content');

    switch (currentTab) {
      case 'aboutTab':
        changingContent.innerHTML = profileAboutTabTemplate(userData);
        document.getElementById('postProfile').addEventListener('click', this.postProfile.bind(this));
        break;

      case 'settingsTab':
        changingContent.innerHTML = profileSettingsTabTemplate();
        break;

      case 'eventsTab':
        changingContent.innerHTML = profileEventsTabTemplate();
        this.renderOneProfileEventsTab();
        break;

      default:
        break;
    }
  }

  renderOneProfileEventsTab() {
    const {currentEventsButton} = this.globalStore.userStore;
    const {profileEvents} = this.globalStore.userStore;

    const eventsButtonsBlock = document.getElementById('jsEventsButtonsBlock');

    eventsButtonsBlock.addEventListener('click', buttonToggleHandler.bind(this));

    switch (currentEventsButton) {
      case 'planningEventsButton':
        this.renderEventsList(profileEvents);
        break;

      case 'visitedEventsButton':
        this.renderEventsList([]);
        break;

      default:
        break;
    }
  }

  renderPreviewAvatar() {
    const avatar = document.getElementById('profileAvatar');
    avatar.style.background = `url(${this.globalStore.userStore.avatarPreviewUrl}) no-repeat center / cover`;

    document.getElementById('jsUploadAvatar').style.display = 'none';
    document.getElementById('jsSubmitAvatar').style.display = 'inline-block';
    document.getElementById('jsDeclineAvatar').style.display = 'inline-block';
  }

  renderUnPreviewAvatar() {
    const {userData} = this.globalStore.userStore;
    const avatar = document.getElementById('profileAvatar');
    avatar.style.background = `url(${urlMap.imgUrl + userData.Uid}) no-repeat center / cover`;

    document.getElementById('jsUploadAvatar').style.display = 'inline-block';
    document.getElementById('jsSubmitAvatar').style.display = 'none';
    document.getElementById('jsDeclineAvatar').style.display = 'none';
  }

  renderAvatarPushed() {
    const avatar = document.getElementById('profileAvatar');
    const navbarAvatar = document.getElementById('navbar-avatar');
    avatar.style.background = `url(${this.globalStore.userStore.avatarPreviewUrl}) no-repeat center / cover`;
    navbarAvatar.style.background = `url(${this.globalStore.userStore.avatarPreviewUrl}) no-repeat center / cover`;

    document.getElementById('jsUploadAvatar').style.display = 'inline-block';
    document.getElementById('jsSubmitAvatar').style.display = 'none';
    document.getElementById('jsDeclineAvatar').style.display = 'none';
  }

  subscribeViews() {
    this[globalStoreSymbol].eventBus.subscribe(
      channelNames.errorValidation,
      this.renderValidationErrors.bind(this)
    );
    this[globalStoreSymbol].eventBus.subscribe(channelNames.userUpdated, this.renderLoggedNavbar.bind(this));
    this[globalStoreSymbol].eventBus.subscribe(channelNames.userUpdated, this.renderProfilePage.bind(this));
    this[globalStoreSymbol].eventBus.subscribe(channelNames.tabChanged, this.renderChangingContent.bind(this));
    this[globalStoreSymbol].eventBus.subscribe(channelNames.avatarPreview, this.renderPreviewAvatar.bind(this));
    this[globalStoreSymbol].eventBus.subscribe(channelNames.avatarDeclined, this.renderUnPreviewAvatar.bind(this));
    this[globalStoreSymbol].eventBus.subscribe(channelNames.avatarPushed, this.renderAvatarPushed.bind(this));
    this[globalStoreSymbol].eventBus.subscribe(
      channelNames.userEventsButtonChanged,
      this.renderEventsList.bind(this)
    );
  }

  postProfile(e) {
    e.preventDefault();
    const formBody = document.getElementById('jsFormBody');
    const dataFromForm = new FormData(formBody);
    const objectDataForm = Object.fromEntries(dataFromForm);
    this.actions.postProfileForm(objectDataForm);
  }
}
