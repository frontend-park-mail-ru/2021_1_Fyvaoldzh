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
        window.scroll(0, 0);
        this.renderLoginPage();
        break;

      case routes.signup:
        window.scroll(0, 0);
        this.renderSignUp();
        break

      case routes.profile:
        window.scroll(0, 0);
        console.log('dawawdda');
        this.userView.renderMyProfilePage(state.parameter);
        break;

      case routes.main:
        window.scroll(0, 0);
        this.eventsView.renderEvents();
        break;

      case routes.events:
        window.scroll(0, 0);
        this.eventsView.renderEvents();
        break;
    }
  }

  renderSignUp() {
    this.wrapper.style.background = 'url("components/img/form-background.jpg") no-repeat top / cover';
    this.wrapper.innerHTML = '';
    this.wrapper.innerHTML = signUpFormTemplate({});
  }

  renderLoginPage() {
    this.wrapper.style.background = 'url("components/img/form-background.jpg") no-repeat top / cover';
    this.wrapper.innerHTML = '';
    this.wrapper.innerHTML = loginTemplate({});
  }

  renderLogout() {
    this.navbar.innerHTML = '';
    this.navbar.innerHTML = navbarTemplate({});
    this.actions.routerChangePage('/events');
  }

  renderNavbar() {
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

    if (currentUrl.pathname.includes('event') && currentUrl.pathname !== routes.events) {
      window.scroll(0, 0);
      this.actions.eventPage(Number(currentUrl.pathname.substr(6)));
      return;
    }

    if (currentUrl.pathname.includes('profile') && currentUrl.pathname !== routes.profile) {
      window.scroll(0, 0);
      this.actions.updateSomeUser(Number(currentUrl.pathname.substr(8)));
      return;
    }

    switch (currentUrl.pathname) {
      case routes.events:
        window.scroll(0, 0);
        this.actions.updateEvents();
        break;

      case routes.main:
        window.scroll(0, 0);
        this.actions.updateEvents();
        break;

      case routes.profile:
        window.scroll(0, 0);
        this.actions.updateUser();
        break;

      case routes.signup:
        window.scroll(0, 0);
        if (userData) {
          this.actions.routerChangePage(routes.events); // Редирект
          return;
        }
        this.renderSignUp();
        break;

      case routes.login:
        window.scroll(0, 0);
        if (userData) { // Если юзер уже зашел, но пытается зайти на страницу логина/регистрации.
          this.actions.routerChangePage(routes.events); // Редирект пока на эвенты
          return;
        }
        this.renderLoginPage();
        break;

      case routes.logout:
        window.scroll(0, 0);
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
