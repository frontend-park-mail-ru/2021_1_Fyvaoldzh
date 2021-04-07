import {pageNames, channelNames} from '../../config/config.js';

const globalStoreSymbol = Symbol('globalStoreSymbol');
const actionsSymbol = Symbol('actionsSymbol');

export default class ChangePageView {
  constructor({globalStore, actions}) {
    this[globalStoreSymbol] = globalStore;
    this[actionsSymbol] = actions;
    this.wrapper = document.getElementById('wrapper');
    this.navbar = document.getElementById('navbar');
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  get actions() {
    return this[actionsSymbol];
  }

  renderSignUp() {
    window.scroll(0, 0);
    this.wrapper.style.background = 'url("components/img/form-background.jpg") no-repeat top / cover';
    this.wrapper.innerHTML = '';
    this.wrapper.innerHTML = signUpFormTemplate({});
  }

  renderLoginPage() {
    window.scroll(0, 0);
    this.wrapper.style.background = 'url("components/img/form-background.jpg") no-repeat top / cover';
    this.wrapper.innerHTML = '';
    this.wrapper.innerHTML = loginTemplate();
  }

  renderLogout() {
    window.scroll(0, 0);
    this.navbar.innerHTML = '';
    this.navbar.innerHTML = navbarTemplate({});
    this.actions.changePage('events');
  }

  renderNavbar() {
    window.scroll(0, 0);
    this.navbar.innerHTML = '';
    this.navbar.innerHTML = navbarTemplate({});
  }

  onRegisterSuccessfull() {
    this.actions.updateUser();
    this.actions.changePage(pageNames.eventsPage);
  }

  changePage() {
    const {currentPage} = this.globalStore;
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

      default:
        break;
    }
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(channelNames.logoutSuccessfull, this.renderLogout.bind(this));
    this.globalStore.eventBus.subscribe(channelNames.userIsNotAuth, this.renderNavbar.bind(this));
    this.globalStore.eventBus.subscribe(channelNames.pageChanged, this.changePage.bind(this));
    this.globalStore.eventBus.subscribe(channelNames.registerSuccessfull, this.onRegisterSuccessfull.bind(this));
  }
}
