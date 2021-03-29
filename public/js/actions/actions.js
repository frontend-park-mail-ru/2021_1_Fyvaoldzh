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
}
