import { channelNames, routes } from '../../config/config.js';

const globalStoreSymbol = Symbol('globalStoreSymbol');
const actionsSymbol = Symbol('actionsSymbol');

export default class ChangePageView {
  constructor({
    globalStore, actions,
  }) {
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
    this.actions.routerChangePage('/events');
  }

  renderNavbar() {
    window.scroll(0, 0);
    this.navbar.innerHTML = '';
    this.navbar.innerHTML = navbarTemplate({});
  }

  onRegisterSuccessfull() {
    this.actions.updateUser();
    this.actions.routerChangePage(routes.events);
  }

  renderAlreadyLoginError() {
    // ...
  }

  changePage() {
    const { currentPage } = this.globalStore.routerStore;
    const { userData } = this.globalStore.userStore;

    if (currentPage.pathname.includes('event') && currentPage.pathname !== routes.events) { // Заменить на регулярку
      this.actions.eventPage(Number(currentPage.pathname.substr(6)));
      return;
    }

    if (currentPage.pathname.includes('profile') && currentPage.pathname !== routes.profile) { // Заменить на регулярку
      this.actions.updateOneProfile(Number(currentPage.pathname.substr(8)));
      return;
    }

    switch (currentPage.pathname) {
      case routes.events:
        this.actions.updateEvents();
        break;

      case routes.main:
        this.actions.updateEvents();
        break;

      case routes.profile:
        this.actions.updateUser();
        break;

      case routes.signup:
        if (userData) {
          alert('ухади'); // Затычка
          this.actions.routerChangePage(routes.events); // Редирект пока на эвенты
          return;
        }
        this.renderSignUp();
        break;

      case routes.login:
        if (userData) { // Если юзер уже зашел, но пытается зайти на страницу логина/регистрации.
          alert('аташел'); // Затычка
          this.actions.routerChangePage(routes.events); // Редирект пока на эвенты
          return;
        }
        this.renderLoginPage();
        break;

      case routes.logout:
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
