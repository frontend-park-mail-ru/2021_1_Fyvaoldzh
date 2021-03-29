import { pageNames, channelNames } from '../../config/config.js';

export default class ChangePageView {
  constructor({eventBus, eventsStore, globalStore, actions}) {
    this.eventBus = eventBus;
    this.eventsStore = eventsStore;
    this.globalStore = globalStore;
    this.actions = actions;
  }

  renderSignUp() {
    window.scroll(0, 0);
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = signUpFormTemplate({});
  }

  renderLoginPage() {
    window.scroll(0, 0);
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = loginTemplate();
  }

  renderLogout() {
    window.scroll(0, 0);
    navbar.innerHTML = '';
    navbar.innerHTML = navbarTemplate({});
    this.actions.changePage('events');
  }

  renderNavbar() {
    window.scroll(0, 0);
    navbar.innerHTML = '';
    navbar.innerHTML = navbarTemplate({});
  }

  onRegisterSuccessfull() {
    this.actions.updateUser();
    this.actions.changePage(pageNames.eventsPage);
  }

  changePage() {
    const currentPage = this.globalStore.getCurrentPage();
    switch (currentPage) {
      case pageNames.eventsPage:
        this.actions.updateEvents();
        break;
      case pageNames.profilePage:
        this.actions.updateUser();
        break;
      case pageNames.registrationPage:
        this.renderSignUp();
        break;
      case pageNames.loginPage:
        this.renderLoginPage();
        break;
      case pageNames.logoutPage:
        this.renderLogout();
        break;
      case pageNames.oneEventPage:
    }
  }

  subscribeViews() {
    this.eventBus.subscribe(channelNames.logoutSuccessfull, this.renderLogout.bind(this));
    this.eventBus.subscribe(channelNames.userIsNotAuth, this.renderNavbar.bind(this));
    this.eventBus.subscribe(channelNames.pageChanged, this.changePage.bind(this));
    this.eventBus.subscribe(channelNames.registerSuccessfull, this.onRegisterSuccessfull.bind(this));
  }
}