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
}
