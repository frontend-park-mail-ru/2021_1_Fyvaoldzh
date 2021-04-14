import {
  ChannelNames, urlMap, SERVER_ERRORS, profileEventsButton,
} from '../../config/config';
import INPUTS from '../../validationModule/validation';
import {
  addDeclensionOfNumbers,
  buttonToggleHandler,
  profilePaginatorHandler,
  updatePaginationState,
} from '../utils/utils';
import ProfilesBaseView from '../ProfilesBaseView/ProfilesBaseView';
import { PostUserDataInterface } from '../../interfaces';

const navbarLoggedTemplate = require('../../../components/navbar/navbar-logged.pug');
const profileTemplate = require('../../../templates/profile/profile.pug');
const profileAboutTabTemplate = require('../../../templates/profile-about-tab/profile-about-tab.pug');
const paginationBlockTemplate = require('../../../templates/pagination-block/pagination-block.pug');
const profileSettingsTabTemplate = require('../../../templates/profile-settings-tab/profile-settings-tab.pug');
const profileEventsTabTemplate = require('../../../templates/profile-events-tab/profile-events-tab.pug');

const redBoxShadow = '0px 0px 10px 0px #CE0E50';
const greyBoxShadow = '0 0 10px rgba(0, 0, 0, 0.25)';

function activateTab(button: string) {
  document.getElementById(button).classList.add('tab-active');
  document.getElementById(button).classList.remove('tab-inactive');
}

export default class UserView extends ProfilesBaseView {
  public globalStore: any;

  public actions: any;

  constructor(globalStore: any, actions: any) {
    super();
    this.globalStore = globalStore;
    this.actions = actions;
  }

  renderEventsList(events: any) {
    super.renderEventsList(events);

    const { currentEventsPage, currentEventsButton } = this.globalStore.userStore;

    // обновляем состояние пагинатора после отрисовки списка
    switch (currentEventsButton) {
      case profileEventsButton.planning:
        const { profilePlanningEvents } = this.globalStore.userStore;
        updatePaginationState(currentEventsPage, profilePlanningEvents?.length);
        break;

      case profileEventsButton.visited:
        const { profileVisitedEvents } = this.globalStore.userStore;
        updatePaginationState(currentEventsPage, profileVisitedEvents?.length);
        break;

      default:
        break;
    }
  }

  handleFileSelect(e: any) {
    const file = e.target.files[0];

    const errorAvatar = document.getElementById('jsErrorAvatar');
    const avatarBlock = document.getElementById('profileAvatar');

    avatarBlock.style.boxShadow = greyBoxShadow;
    errorAvatar.innerText = '';
    if (!file.type.match('image.*')) {
      errorAvatar.innerText = 'Только картинки, пожалуйста!!!';
      avatarBlock.style.boxShadow = redBoxShadow;
      return;
    }
    const reader = new FileReader();
    reader.onload = (evnt) => {
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

    document.getElementsByName('login').forEach((el) => (el.style.all = null));
    document.getElementsByName('password').forEach((el) => (el.style.all = null));
    document.getElementsByName('name').forEach((el) => (el.style.all = null));
    document.getElementsByName('birthday').forEach((el) => (el.style.all = null));
    document.getElementsByName('city').forEach((el) => (el.style.all = null));
    document.getElementsByName('email').forEach((el) => (el.style.all = null));

    validationErrors.forEach((error:any) => {
      switch (error) {
        case 'login':
          document.getElementsByName('login').forEach((el) => (el.style.boxShadow = redBoxShadow));
          document.getElementById('loginError').innerText = INPUTS.login.errorMsg;
          break;

        case 'password':
          document.getElementsByName('password').forEach((el) => (el.style.boxShadow = redBoxShadow));
          document.getElementById('passwordError').innerText = INPUTS.password.errorMsg;
          break;

        case 'name': // Nickname / name исправить все на одно
          document.getElementsByName('name').forEach((el) => (el.style.boxShadow = redBoxShadow));
          document.getElementById('nicknameError').innerText = INPUTS.name.errorMsg;
          break;

        case 'loginExist':
          document.getElementsByName('login').forEach((el) => (el.style.boxShadow = redBoxShadow));
          document.getElementById('nicknameError').innerText = SERVER_ERRORS.LOGIN_EXIST;
          break;

        case 'wrongLoginOrPass':
          document.getElementsByName('login').forEach((el) => (el.style.boxShadow = redBoxShadow));
          document.getElementsByName('password').forEach((el) => (el.style.boxShadow = redBoxShadow));
          document.getElementById('passwordError').innerText = SERVER_ERRORS.WRONG_LOGIN_OR_PASS;
          break;

        case 'birthday':
          document.getElementsByName('birthday').forEach((el) => (el.style.boxShadow = redBoxShadow));
          document.getElementById('birthdayError').innerText = INPUTS.birthday.errorMsg;
          break;

        case 'email':
          document.getElementsByName('email').forEach((el) => (el.style.boxShadow = redBoxShadow));
          document.getElementById('emailError').innerText = INPUTS.email.errorMsg;
          break;

        default:
          break;
      }
    });
  }

  renderProfilePage(currentTab?: string) {
    if (!currentTab) {
      currentTab = this.globalStore.userStore.currentTab;
    }

    const { userData } = this.globalStore.userStore;

    const wrapper = document.getElementById('wrapper');
    wrapper.style.background = 'url("templates/profile/img/profile-background.jpg") no-repeat top / 100%';

    if (userData.followers) {
      userData.followersCount = addDeclensionOfNumbers(userData.followers?.length, [
        'подписчик',
        'подписчика',
        'подписчиков',
      ]);
      userData.planningCount = addDeclensionOfNumbers(userData.planning?.length, [
        'планируемое',
        'планируемых',
        'планируемых',
      ]);

      userData.visitedCount = addDeclensionOfNumbers(userData.visited?.length, [
        'посещенное',
        'посещенных',
        'посещенных',
      ]);
    }

    wrapper.innerHTML = '';
    wrapper.innerHTML = profileTemplate(userData);

    const avatar = document.getElementById('profileAvatar');
    avatar.style.background = `url(${urlMap.imgUrl}/${userData.Uid}) no-repeat center / cover`;

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
      tab.addEventListener('click', buttonToggleHandler.bind(this));
    });

    this.renderChangingContent(currentTab);
    // window.history.pushState('', '', '/profile');

    // ренедерим пагинатор:
    if (currentTab === 'eventsTab') {
      const { currentEventsButton, currentEventsPage } = this.globalStore.userStore;
      const profilePaginator = document.getElementById('paginator');

      if (profilePaginator) {
        profilePaginator.innerHTML = paginationBlockTemplate();
      }

      switch (currentEventsButton) {
        case profileEventsButton.planning:
          updatePaginationState(currentEventsPage, 1);

          break;
        case profileEventsButton.visited:
          updatePaginationState(currentEventsPage, 1);
          break;

        default:
          break;
      }

      document.getElementById('paginationBack').addEventListener('click', profilePaginatorHandler.bind(this));
      document.getElementById('paginationForward').addEventListener('click', profilePaginatorHandler.bind(this));
    }
  }

  renderChangingContent(currentTab?: string) {
    if (!currentTab) {
      currentTab = this.globalStore.userStore.currentTab;
    }

    const { userData } = this.globalStore.userStore;

    const changingContent = document.getElementById('changing-content');

    switch (currentTab) {
      case 'aboutTab':
        changingContent.innerHTML = profileAboutTabTemplate(userData);
        document.getElementById('postProfile').addEventListener('click', this.postProfile.bind(this));
        activateTab(currentTab);
        break;

      case 'settingsTab':
        changingContent.innerHTML = profileSettingsTabTemplate();
        activateTab(currentTab);
        break;

      case 'eventsTab':
        changingContent.innerHTML = profileEventsTabTemplate();
        activateTab(currentTab);
        this.renderOneProfileEventsTab();

        const { currentEventsPage, currentEventsButton } = this.globalStore.userStore;
        const eventsPaginator = document.getElementById('paginator');
        eventsPaginator.innerHTML = paginationBlockTemplate();

        switch (currentEventsButton) {
          case profileEventsButton.planning:
            updatePaginationState(currentEventsPage, 1);
            break;
          case profileEventsButton.visited:
            updatePaginationState(currentEventsPage, 1);
            break;

          default:
            break;
        }

        document.getElementById('paginationBack').addEventListener('click', profilePaginatorHandler.bind(this));
        document.getElementById('paginationForward').addEventListener('click', profilePaginatorHandler.bind(this));
        break;

      default:
        break;
    }
  }

  renderOneProfileEventsTab() {
    const { currentEventsButton } = this.globalStore.userStore;
    const { profilePlanningEvents } = this.globalStore.userStore;
    const { profileVisitedEvents } = this.globalStore.userStore;

    // const eventsButtonsBlock = document.getElementById('jsEventsButtonsBlock');
    //
    // eventsButtonsBlock.addEventListener('click', buttonToggleHandler.bind(this));

    const changingContent = document.getElementById('changing-content');
    const buttons = Array.from(changingContent.querySelectorAll('button[data-buttontype="toggle"]'));
    buttons.forEach((button) => {
      button.addEventListener('click', buttonToggleHandler.bind(this));
    });

    switch (currentEventsButton) {
      case 'planningEventsButton':
        this.renderEventsList(profilePlanningEvents);
        break;

      case 'visitedEventsButton':
        this.renderEventsList(profileVisitedEvents);
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
    avatar.style.background = `url(${urlMap.imgUrl}/${userData.Uid}) no-repeat center / cover`;

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
    this.globalStore.eventBus.subscribe(ChannelNames.userUpdated, this.renderProfilePage.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.tabChanged, this.renderChangingContent.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.avatarPreview, this.renderPreviewAvatar.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.avatarDeclined, this.renderUnPreviewAvatar.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.avatarPushed, this.renderAvatarPushed.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.userEventsButtonChanged, this.renderEventsList.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.profilePageChanged, this.renderEventsList.bind(this));
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
