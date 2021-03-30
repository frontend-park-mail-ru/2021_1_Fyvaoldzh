import { pageNames, channelNames, urlMap, SERVER_ERRORS } from '../../config/config.js';
import { actions } from '../../main.js';
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

    document.getElementsByName('login').forEach(el => el.style = null);
    document.getElementsByName('password').forEach(el => el.style = null);
    document.getElementsByName('name').forEach(el => el.style = null);
    document.getElementsByName('birthday').forEach(el => el.style = null);
    document.getElementsByName('city').forEach(el => el.style = null);
    document.getElementsByName('email').forEach(el => el.style = null);

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
          break;

        case 'birthday':
          document.getElementsByName('birthday').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
          document.getElementById('birthdayError').innerText = INPUTS.birthday.errorMsg;
          break;

        case 'email':
          document.getElementsByName('email').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
          document.getElementById('emailError').innerText = INPUTS.email.errorMsg;
          break;

        default:
          break;
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

    const ava = document.getElementById('profileAvatar');
    ava.style.background = `url(${urlMap.imgUrl + profileData.Uid}) no-repeat`;
    
    document.getElementById('imageFile').addEventListener('change', handleFileSelect);
    document.getElementById('jsSubmitAvatar').addEventListener('click', actions.pushAvatar.bind(actions));

    const tabsBlock = document.getElementById('jsTabsBlock');

    tabsBlock.addEventListener('click', this.buttonToggleHandler);

    this.renderChangingContent();
  }

  renderChangingContent() {
    const currentTab = this.userStore.getTab();
    const profileData = this.userStore.getData();
    
    console.log(currentTab);
    const changingContent = document.getElementById('changing-content');

    switch(currentTab) {
      case 'aboutTab':
        changingContent.innerHTML = myProfileAboutTabTemplate(profileData);
        document.getElementById('postProfile').addEventListener('click', this.postProfile.bind(this));
        break;

      case 'settingsTab':
        changingContent.innerHTML = myProfileSettingsTabTemplate();
        break;

      case 'eventsTab':
        changingContent.innerHTML = myProfileEventsTabTemplate(profileData);
        break;
    }
  }

  renderPreviewAvatar() {
    const avatar = document.getElementById('profileAvatar');
    avatar.style.background = `url(${this.userStore.getAvatarPreview()}) no-repeat center / cover`;

    document.getElementById('jsUploadAvatar').style.display = 'hidden';
    document.getElementById('jsSubmitAvatar').style.display = 'inline-block';
    document.getElementById('jsDeclineAvatar').style.display = 'inline-block';
  }

  subscribeViews() {
    this.eventBus.subscribe(channelNames.errorValidation, this.renderValidationErrors.bind(this));
    this.eventBus.subscribe(channelNames.userUpdated, this.renderLoggedNavbar.bind(this));
    this.eventBus.subscribe(channelNames.userUpdated, this.renderMyProfilePage.bind(this));
    this.eventBus.subscribe(channelNames.tabChanged, this.renderChangingContent.bind(this));
    this.eventBus.subscribe(channelNames.avatarPreview, this.renderPreviewAvatar.bind(this));
  }

  buttonToggleHandler(e) {
    const {target} = e;

    if (target.classList.contains('tab-inactive')) {
      const curActiveElem = target.parentNode.querySelector('.tab-active');
      curActiveElem.classList.add('tab-inactive');
      target.classList.add('tab-active');
      target.classList.remove('tab-inactive');
      curActiveElem.classList.remove('tab-active');
      console.log(target.id);
      actions.changeTab(target.id);
    }

    if (target.classList.contains('button-inactive')) {
      const curActiveElem = target.parentNode.querySelector('.button-active');
      curActiveElem.classList.add('button-inactive');
      target.classList.add('button-active');
      target.classList.remove('button-inactive');
      curActiveElem.classList.remove('button-active');
    }
  }

  postProfile(e) {
    e.preventDefault();
    const formBody = document.getElementById('jsFormBody');
    const dataFromForm = new FormData(formBody);
    const objectDataForm = Object.fromEntries(dataFromForm);
    actions.postProfileForm(objectDataForm);
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
    actions.avatarPreview(evnt.target.result);
  }

  
  reader.readAsDataURL(file);
}