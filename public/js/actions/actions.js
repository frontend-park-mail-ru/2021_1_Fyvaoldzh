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

  updateUser(first = null) {
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

  routerChangePage(page) {
    this.dispatcher.dispatch({
      eventName: 'router/changePage',
      data: page,
    });
  }

  updateSomeUser(id) {
    this.dispatcher.dispatch({
      eventName: 'someUser/update',
      data: id,
    });
  }
}
