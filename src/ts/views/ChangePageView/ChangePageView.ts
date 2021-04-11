import { channelNames, routes } from '../../config/config';
import Store from "../../storage/store";
import Actions from "../../actions/actions";
import UserView from "../UserView/UserView";
import EventsView from "../EventsView/EventsView";
import OneEventView from "../OneEventView/OneEventView";
import { historyState } from '../../interfaces';

const signUpFormTemplate = require('Templates/signup/signup.pug');
const loginTemplate = require('Templates/login/login.pug');
const navbarTemplate = require('Components/navbar/navbar.pug');


export default class ChangePageView {
  public globalStore: Store;
  public actions: Actions;
  public wrapper: HTMLElement;
  public navbar: HTMLElement;
  public userView: UserView;
  public eventsView: EventsView;
  public oneEventView: OneEventView;

  constructor(globalStore: Store,
              actions: Actions,
              userView: UserView,
              eventsView: EventsView,
              oneEventView: OneEventView) {
    this.globalStore = globalStore;
    this.actions = actions;
    this.wrapper = document.getElementById('wrapper');
    this.navbar = document.getElementById('navbar');
    this.userView = userView;
    this.eventsView = eventsView;
    this.oneEventView = oneEventView;

    window.onpopstate = (ev: any) => {
      if (ev.state) {
        this.render(ev.state);
      }
    };
  }

  async render(state: historyState) {
    if (state.page.includes('event') && state.page !== routes.events) {
      await this.actions.eventPage(<number><unknown>state.page.substr(6));
      this.oneEventView.renderEventPage();
      return;
    }

    if (state.page.includes('profile') && state.page !== routes.profile) {
      this.actions.updateSomeUser(Number(state.page.substr(8)));
      return;
    }

    switch (state.page) {
      case routes.login:
        this.renderLoginPage();
        break;

      case routes.signup:
        this.renderSignUp();
        break

      case routes.profile:
        this.userView.renderMyProfilePage();
        break;

      case routes.main:
        this.eventsView.renderEvents();
        break;

      case routes.events:
        this.eventsView.renderEvents();
        break;
    }
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
    this.wrapper.innerHTML = loginTemplate({});
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
    const { currentUrl } = this.globalStore.routerStore;
    const { userData } = this.globalStore.userStore;

    if (currentUrl.pathname.includes('event') && currentUrl.pathname !== routes.events) { // Заменить на регулярку
      this.actions.eventPage(Number(currentUrl.pathname.substr(6)));
      return;
    }

    if (currentUrl.pathname.includes('profile') && currentUrl.pathname !== routes.profile) { // Заменить на регулярку
      this.actions.updateSomeUser(Number(currentUrl.pathname.substr(8)));
      return;
    }

    switch (currentUrl.pathname) {
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
