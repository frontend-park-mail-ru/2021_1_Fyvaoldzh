import Dispatcher from '../dispatcher/dispatcher';

export default class Actions {
  private dispatcher: Dispatcher;

  constructor(dispatcher: Dispatcher) {
    this.dispatcher = dispatcher;
  }

  register(registerData: object) {
    this.dispatcher.dispatch({
      eventName: 'user/register',
      data: registerData,
    });
  }

  login(loginData: object) {
    this.dispatcher.dispatch({
      eventName: 'user/login',
      data: loginData,
    });
  }

  updateUser(first: boolean = false) {
    this.dispatcher.dispatch({
      eventName: 'user/update',
      data: first,
    });
  }

  logout() {
    this.dispatcher.dispatch({
      eventName: 'user/logout',
      data: null,
    });
  }

  updateEvents() {
    this.dispatcher.dispatch({
      eventName: 'events/update',
      data: null,
    });
  }

  eventPage(id: number) {
    this.dispatcher.dispatch({
      eventName: 'oneEvent/update',
      data: id,
    });
  }

  changeTab(tab: string) {
    this.dispatcher.dispatch({
      eventName: 'user/changeTab',
      data: tab,
    });
  }

  routerChangePage(page: string) {
    this.dispatcher.dispatch({
      eventName: 'router/changePage',
      data: page,
    });
  }

  uploadEventsContent() {
    this.dispatcher.dispatch({
      eventName: 'events/uploadEventsContent',
      data: null,
    });
  }

  changeEventCategory(category: string) {
    this.dispatcher.dispatch({
      eventName: 'events/changeCategory',
      data: category,
    });
  }

  addPlanningEvent(id: number) {
    this.dispatcher.dispatch({
      eventName: 'oneEvent/add',
      data: id,
    });
  }

  removePlanningEvent(id: number) {
    this.dispatcher.dispatch({
      eventName: 'oneEvent/remove',
      data: id,
    });
  }

  postProfileForm(data: any) {
    this.dispatcher.dispatch({
      eventName: 'user/postProfileForm',
      data,
    });
  }

  avatarPreview(data: any) {
    this.dispatcher.dispatch({
      eventName: 'user/avatarPreview',
      data,
    });
  }

  pushAvatar() {
    this.dispatcher.dispatch({
      eventName: 'user/avatarPush',
      data: null,
    });
  }

  declineAvatar() {
    this.dispatcher.dispatch({
      eventName: 'user/avatarDecline',
      data: null,
    });
  }

  updateUserEvents() {
    this.dispatcher.dispatch({
      eventName: 'user/updateEvents',
      data: null,
    });
  }

  changeUserEventsButton(buttonId: any) {
    this.dispatcher.dispatch({
      eventName: 'user/changeEventsButton',
      data: buttonId,
    });
  }

  userPageForward() {
    this.dispatcher.dispatch({
      eventName: 'user/pageForward',
      data: null,
    });
  }

  userPageBack() {
    this.dispatcher.dispatch({
      eventName: 'user/pageBack',
      data: null,
    });
  }

  updateOneProfile(id: any) {
    this.dispatcher.dispatch({
      eventName: 'oneProfile/update',
      data: id,
    });
  }

  updateOneProfileEvents() {
    this.dispatcher.dispatch({
      eventName: 'oneProfile/updateEvents',
      data: null,
    });
  }

  changeOneProfileEventsButton(buttonId: any) {
    this.dispatcher.dispatch({
      eventName: 'oneProfile/changeEventsButton',
      data: buttonId,
    });
  }

  changeSearchEventsButton(buttonId: any) {
    this.dispatcher.dispatch({
      eventName: 'search/changeEventsButton',
      data: buttonId,
    });
  }

  searchChangeTab(tabId: any) {
    this.dispatcher.dispatch({
      eventName: 'search/changeTab',
      data: tabId,
    });
  }

  searchUpdate(data: any) {
    this.dispatcher.dispatch({
      eventName: 'search/update',
      data,
    });
  }

  newSearchInputData(data: any) {
    this.dispatcher.dispatch({
      eventName: 'search/newInputData',
      data,
    });
  }

  searchPageForward() {
    this.dispatcher.dispatch({
      eventName: 'search/pageForward',
      data: null,
    });
  }

  searchPageBack() {
    this.dispatcher.dispatch({
      eventName: 'search/pageBack',
      data: null,
    });
  }

  oneProfilePageForward() {
    this.dispatcher.dispatch({
      eventName: 'oneProfile/pageForward',
      data: null,
    });
  }

  oneProfilePageBack() {
    this.dispatcher.dispatch({
      eventName: 'oneProfile/pageBack',
      data: null,
    });
  }
}
