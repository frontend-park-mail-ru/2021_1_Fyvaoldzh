export default class Actions {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  register(registerData) {
    this.dispatcher.dispatch({
      eventName: 'user/register',
      data: registerData,
    });
  }

  login(loginData) {
    this.dispatcher.dispatch({
      eventName: 'user/login',
      data: loginData,
    });
  }

  updateUser() {
    this.dispatcher.dispatch({
      eventName: 'user/update',
      data: null,
    });
  }

  logout() {
    this.dispatcher.dispatch({
      eventName: 'user/logout',
      data: null,
    });
  }

  changePage(page) {
    this.dispatcher.dispatch({
      eventName: 'changePage',
      data: page,
    });
  }

  updateEvents() {
    this.dispatcher.dispatch({
      eventName: 'events/update',
      data: null,
    });
  }

  eventPage(id) {
    this.dispatcher.dispatch({
      eventName: 'oneEvent/update',
      data: id,
    });
  }

  changeTab(tab) {
    this.dispatcher.dispatch({
      eventName: 'user/changeTab',
      data: tab,
    });
  }

  postProfileForm(data) {
    this.dispatcher.dispatch({
      eventName: 'user/postProfileForm',
      data,
    });
  }

  avatarPreview(data) {
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

  changeUserEventsButton(buttonId) {
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

  updateOneProfile(id) {
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

  changeOneProfileEventsButton(buttonId) {
    this.dispatcher.dispatch({
      eventName: 'oneProfile/changeEventsButton',
      data: buttonId,
    });
  }

  changeSearchEventsButton(buttonId) {
    this.dispatcher.dispatch({
      eventName: 'search/changeEventsButton',
      data: buttonId,
    });
  }

  searchChangeTab(tabId) {
    this.dispatcher.dispatch({
      eventName: 'search/changeTab',
      data: tabId,
    });
  }

  searchUpdate(data) {
    this.dispatcher.dispatch({
      eventName: 'search/update',
      data: data,
    });
  }

  newSearchInputData(data) {
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
