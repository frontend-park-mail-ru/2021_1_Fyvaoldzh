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

  postProfileForm(data: object) {
    this.dispatcher.dispatch({
      eventName: 'user/postProfileForm',
      data,
    });
  }

  avatarPreview(data: string) {
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

<<<<<<< HEAD:src/ts/actions/actions.ts
  routerChangePage(page: string) {
    this.dispatcher.dispatch({
      eventName: 'router/changePage',
      data: page,
    });
  }

  updateSomeUser(id: number) {
    this.dispatcher.dispatch({
      eventName: 'someUser/update',
      data: id,
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
=======
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
>>>>>>> origin/dev:public/js/actions/actions.js
    });
  }
}
