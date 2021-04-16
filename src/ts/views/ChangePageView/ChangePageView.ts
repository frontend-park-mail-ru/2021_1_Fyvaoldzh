import { ChannelNames, routes } from "../../config/config";
import Store from "../../storage/store";
import Actions from "../../actions/actions";
import UserView from "../UserView/UserView";
import EventsView from "../EventsView/EventsView";
import OneEventView from "../OneEventView/OneEventView";
import SearchView from "../SearchView/SearchView";
import { HistoryState } from "../../interfaces";
import { searchButtonHandler, searchKeyPress } from "../utils/utils";

const signUpFormTemplate = require("Templates/signup/signup.pug");
const loginTemplate = require("Templates/login/login.pug");
const navbarTemplate = require("Components/navbar/navbar.pug");

export default class ChangePageView {
  public globalStore: Store;

  public actions: Actions;

  public wrapper: HTMLElement;

  public navbar: HTMLElement;

  public userView: UserView;

  public eventsView: EventsView;

  public oneEventView: OneEventView;

  public searchView: SearchView;

  constructor(
    globalStore: Store,
    actions: Actions,
    userView: UserView,
    eventsView: EventsView,
    oneEventView: OneEventView,
    searchView: SearchView
  ) {
    this.globalStore = globalStore;
    this.actions = actions;
    this.wrapper = document.getElementById("wrapper");
    this.navbar = document.getElementById("navbar");
    this.userView = userView;
    this.eventsView = eventsView;
    this.oneEventView = oneEventView;
    this.searchView = searchView;

    window.onpopstate = (ev: any) => {
      if (ev.state) {
        this.render(ev.state);
      }
    };
  }

  async render(state: HistoryState) {
    if (state.page.includes("event") && state.page !== routes.events) {
      await this.actions.eventPage(<number>(<unknown>state.page.substr(6)));
      //this.oneEventView.renderEventPage();
      return;
    }

    if (state.page.includes("profile") && state.page !== routes.profile) {
      const idProfile = Number(state.page.substr(8));

      if (idProfile === this.globalStore.userStore.userData.Uid) {
        this.actions.updateUser();
        return;
      }

      this.actions.updateOneProfile(idProfile);
      return;
    }

    // if (state.page.includes('search')) {  //реализация Димы
    //   window.scroll(0, 0);
    //   console.log(state.parameter);
    //   this.actions.searchUpdate(state.parameter);
    //   return;
    // }

    switch (state.page) {
      case routes.login:
        window.scroll(0, 0);
        this.renderLoginPage();
        break;

      case routes.signup:
        window.scroll(0, 0);
        this.renderSignUp();
        break;

      case routes.profile:
        window.scroll(0, 0);
        this.userView.renderProfilePage(state.parameter);
        break;

      case routes.main:
        window.scroll(0, 0);
        this.eventsView.renderEvents();
        break;

      case routes.events:
        window.scroll(0, 0);
        this.eventsView.renderEvents();
        break;

      case routes.search: //моя реализация
        window.scroll(0, 0);
        this.actions.searchUpdateByHistory();
        break;

      default:
        break;
    }
  }

  renderSignUp() {
    this.wrapper.innerHTML = "";
    this.wrapper.innerHTML = signUpFormTemplate({});
  }

  renderLoginPage() {
    this.wrapper.style.background =
      'url("components/img/form-background.jpg") no-repeat top';
    this.wrapper.innerHTML = "";
    this.wrapper.innerHTML = loginTemplate({});
  }

  renderLogout() {
    this.renderNavbar();
    this.actions.routerChangePage("/events");
  }

  renderNavbar() {
    this.navbar.innerHTML = "";
    this.navbar.innerHTML = navbarTemplate({});

    // const confirmSearch = document.getElementById("jsConfirmSearch");  //реализация Димы
    // const inputSearch = document.getElementById("jsNavbarSearchInput");
    // inputSearch.addEventListener("keypress", searchKeyPress.bind(this));
    // confirmSearch.addEventListener("click", searchButtonHandler.bind(this));
  }

  onRegisterSuccessfull() {
    this.actions.updateUser();
    this.actions.routerChangePage(routes.events);
  }

  changePage() {
    const { currentUrl } = this.globalStore.routerStore;
    const { userData } = this.globalStore.userStore;

    if (
      currentUrl.pathname.includes("event") &&
      currentUrl.pathname !== routes.events
    ) {
      window.scroll(0, 0);
      this.actions.eventPage(Number(currentUrl.pathname.substr(6)));
      return;
    }

    if (
      currentUrl.pathname.includes("profile") &&
      currentUrl.pathname !== routes.profile
    ) {
      const idProfile = Number(currentUrl.pathname.substr(8));

      if (idProfile === this.globalStore.userStore.userData?.Uid) {
        this.actions.updateUser();
        return;
      }
      this.actions.updateOneProfile(idProfile);
      return;
    }

    // if (currentUrl.pathname.includes("search")) {  //реализация Димы
    //   window.scroll(0, 0);
    //   this.actions.searchUpdate(currentUrl.searchParams.get("tab"));
    //   return;
    // }

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
        if (userData) {
          // Если юзер уже зашел, но пытается зайти на страницу логина/регистрации.
          this.actions.routerChangePage(routes.events); // Редирект пока на эвенты
          return;
        }
        this.renderLoginPage();
        break;

      case routes.logout:
        window.scroll(0, 0);
        this.actions.logout();
        this.renderLogout();
        break;

      case routes.search:
        window.scroll(0, 0);
        this.actions.searchUpdate(currentUrl.searchParams);
        break;

      default:
        break;
    }
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(
      ChannelNames.logoutSuccessfull,
      this.renderLogout.bind(this)
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.userIsNotAuth,
      this.renderNavbar.bind(this)
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.pageChanged,
      this.changePage.bind(this)
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.registerSuccessfull,
      this.onRegisterSuccessfull.bind(this)
    );
  }
}
