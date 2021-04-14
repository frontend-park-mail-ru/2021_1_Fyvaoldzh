import {
  ChannelNames, urlMap, SERVER_ERRORS, routes,
} from '../../config/config';
import INPUTS from '../../validationModule/validation';
import Store from '../../storage/store';
import Actions from '../../actions/actions';
import myProfileBackground from '../../../templates/my-profile/img/my-profile-background.jpg';
import eventsBackgroundImg from "../../../templates/events/img/events-background.jpg";

const navbarLoggedTemplate = require('Components/navbar/navbar-logged.pug');
const myProfileTemplate = require('Templates/my-profile/my-profile.pug');
const myProfileAboutTabTemplate = require('Templates/my-profile-about-tab/my-profile-about-tab.pug');
const myProfileSettingsTabTemplate = require('Templates/my-profile-settings-tab/my-profile-settings-tab.pug');
const myProfileEventsTabTemplate = require('Templates/my-profile-events-tab/my-profile-events-tab.pug');

interface PostUserDataInterface {
  name?: string;
  city?: string;
  about?: string;
  birthday?: string;
  email?: string;
}

function activateTab(button: string) {
  document.getElementById(button).classList.add('tab-active');
  document.getElementById(button).classList.remove('tab-inactive');
}

function deactivateTab(button: string) {
  document.getElementById(button).classList.add('tab-inactive');
  document.getElementById(button).classList.remove('tab-active');
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export default class UserView {
  public globalStore: Store;

  public actions: Actions;

  constructor(globalStore: Store, actions: Actions) {
    this.globalStore = globalStore;
    this.actions = actions;
  }

  handleFileSelect(e?: HTMLInputEvent) {
    const file = e.target.files[0];
    // Только изображения.
    if (!file.type.match('image.*')) {
      // TODO переделать алерт, добавить поле ошибки под аватарку.
      return;
    }
    const reader = new FileReader();

    reader.onload = (evnt) => {
      this.actions.avatarPreview(<string>evnt.target.result);
    };
    reader.readAsDataURL(file);
  }

  renderLoggedNavbar() {
    const navbar = document.getElementById('navbar');
    const profileData = this.globalStore.userStore.userData;

    navbar.innerHTML = '';
    navbar.innerHTML = navbarLoggedTemplate(profileData);
    const navbarAvatar = document.getElementById('navbar-avatar');

    navbarAvatar.style.background = `url(${urlMap.imgUrl}/${profileData.Uid}) no-repeat center / cover`;
  }

  renderValidationErrors() {
    const { validationErrors } = this.globalStore.userStore;

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

    document.getElementsByName('login').forEach((el) => el.style.all = null);
    document.getElementsByName('password').forEach((el) => el.style.all = null);
    document.getElementsByName('name').forEach((el) => el.style.all = null);
    document.getElementsByName('birthday').forEach((el) => el.style.all = null);
    document.getElementsByName('city').forEach((el) => el.style.all = null);
    document.getElementsByName('email').forEach((el) => el.style.all = null);

    validationErrors.forEach((error) => {
      switch (error) {
        case 'login':
          document.getElementsByName('login').forEach((el) => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('loginError').innerText = INPUTS.login.errorMsg;
          break;

        case 'password':
          document.getElementsByName('password').forEach((el) => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('passwordError').innerText = INPUTS.password.errorMsg;
          break;

        case 'name': // Nickname / name исправить все на одно
          document.getElementsByName('name').forEach((el) => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('nicknameError').innerText = INPUTS.name.errorMsg;
          break;

        case 'loginExist':
          document.getElementsByName('login').forEach((el) => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('nicknameError').innerText = SERVER_ERRORS.LOGIN_EXIST;
          break;

        case 'wrongLoginOrPass':
          document.getElementsByName('login').forEach((el) => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementsByName('password').forEach((el) => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('passwordError').innerText = SERVER_ERRORS.WRONG_LOGIN_OR_PASS;
          break;

        case 'birthday':
          document.getElementsByName('birthday').forEach((el) => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('birthdayError').innerText = INPUTS.birthday.errorMsg;
          break;

        case 'email':
          document.getElementsByName('email').forEach((el) => (el.style.boxShadow = '0px 0px 10px 0px #CE0E50'));
          document.getElementById('emailError').innerText = INPUTS.email.errorMsg;
          break;

        default:
          break;
      }
    });
  }

  renderMyProfilePage(currentTab?: string) {
    if (!currentTab) {
      currentTab = this.globalStore.userStore.currentTab;
    }

    if (this.globalStore.routerStore.currentUrl.pathname !== routes.profile) {
      return;
    }

    const { userData } = this.globalStore.userStore;

    const wrapper = document.getElementById('wrapper');
    wrapper.style.background = `url(${myProfileBackground}) no-repeat top`;

    wrapper.innerHTML = '';
    wrapper.innerHTML = myProfileTemplate(userData);

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
    const tabs = Array.from(tabsBlock.querySelectorAll('button[data-buttontype="toggle"]'));
    tabs.forEach((tab) => {
      tab.addEventListener('click', this.buttonToggleHandler.bind(this));
    });

    this.renderChangingContent(currentTab);
  }

  renderChangingContent(currentTab?: string) {
    if (!currentTab) {
      currentTab = this.globalStore.userStore.currentTab;
    }

    const { userData } = this.globalStore.userStore;

    const changingContent = document.getElementById('changing-content');
    switch (currentTab) {
      case 'aboutTab':
        changingContent.innerHTML = myProfileAboutTabTemplate(userData);
        document.getElementById('postProfile').addEventListener('click', this.postProfile.bind(this));
        activateTab(currentTab);
        break;

      case 'settingsTab':
        changingContent.innerHTML = myProfileSettingsTabTemplate();
        activateTab(currentTab);
        break;

      case 'eventsTab':
        changingContent.innerHTML = myProfileEventsTabTemplate(userData);
        activateTab(currentTab);
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
    const { userData } = this.globalStore.userStore;
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
    this.globalStore.eventBus.subscribe(ChannelNames.errorValidation, this.renderValidationErrors.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.userUpdated, this.renderLoggedNavbar.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.userUpdated, this.renderMyProfilePage.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.tabChanged, this.renderChangingContent.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.avatarPreview, this.renderPreviewAvatar.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.avatarDeclined, this.renderUnPreviewAvatar.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.avatarPushed, this.renderAvatarPushed.bind(this));
  }

  buttonToggleHandler(e: MouseEvent) {
    const { target } = e;

    if (target instanceof HTMLButtonElement && target.classList.contains('tab-inactive')) {
      const curActiveElem = target.parentNode.querySelector('.tab-active');
      activateTab(target.id);
      deactivateTab(curActiveElem.id);
      this.actions.changeTab(target.id);
    }

    if (target instanceof HTMLButtonElement && target.classList.contains('button-inactive')) {
      const curActiveElem = target.parentNode.querySelector('.button-active');
      curActiveElem.classList.add('button-inactive');
      target.classList.add('button-active');
      target.classList.remove('button-inactive');
      curActiveElem.classList.remove('button-active');
    }
  }

  postProfile(e: MouseEvent) {
    e.preventDefault();
    const formBody = <HTMLFormElement>document.getElementById('jsFormBody');
    const dataFromForm = new FormData(formBody);

    const dataToPost: PostUserDataInterface = {};

    const newName = <string>dataFromForm.get('name');
    if (newName !== this.globalStore.userStore.userData.name) {
      dataToPost.name = newName;
    }

    const newAbout = <string>dataFromForm.get('about');
    if (newAbout !== this.globalStore.userStore.userData.about) {
      dataToPost.about = newAbout;
    }

    const newBirthday = <string>dataFromForm.get('birthday');
    if (newBirthday !== this.globalStore.userStore.userData.about) {
      dataToPost.birthday = newBirthday;
    }

    const newCity = <string>dataFromForm.get('city');
    if (newCity !== this.globalStore.userStore.userData.city) {
      dataToPost.city = newCity;
    }

    const newEmail = <string>dataFromForm.get('email');
    if (newEmail !== this.globalStore.userStore.userData.email) {
      dataToPost.email = newEmail;
    }

    this.actions.postProfileForm(dataToPost);
  }
}
