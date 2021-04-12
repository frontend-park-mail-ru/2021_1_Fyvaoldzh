const baseApi = 'http://95.163.180.8:1323';

export const urlMap = {
  allEventsUrl: `${baseApi}/api/v1/event`,
  oneEventUrl: `${baseApi}/api/v1/event/`,
  postLoginDataUrl: `${baseApi}/api/v1/login`,
  postRegistrationDataUrl: `${baseApi}/api/v1/register`,
  currentProfileUrl: `${baseApi}/api/v1/profile`,
  logout: `${baseApi}/api/v1/logout`,
  putAvatarUrl: `${baseApi}/api/v1/upload_avatar`,
  imgUrl: `${baseApi}/api/v1/avatar`,
  imgEventUrl: `${baseApi}/api/v1/event`,
  apiUrl: `${baseApi}/api/v1`,
  recommendationsEventsUrl: `${baseApi}/api/v1/recomend`,
  addPlanningEventUrl: `${baseApi}/api/v1/add/planning`,
  removePlanningEventUrl: `${baseApi}/api/v1/remove/planning`,
  checkPlanningEventUrl: `${baseApi}/api/v1/event/is_added`,
};

export const SERVER_ERRORS = {
  WRONG_LOGIN_OR_PASS: 'Неправильный логин или пароль',
  LOGIN_EXIST: 'Такой логин уже существует',
};

export const profileTab = {
  about: 'aboutTab',
  settings: 'settingsTab',
  events: 'eventsTab',
};

export enum channelNames {
  errorValidation,
  errorLoginIsExist,
  errorWrongLoginOrPassword,
  registerSuccessfull,
  userUpdated,
  pageChanged,
  eventsUpdated,
  logoutSuccessfull,
  userIsNotAuth,
  eventCome,
  tabChanged,
  avatarPreview,
  avatarDeclined,
  avatarPushed,
  routerPageChanged,
  someUserUpdated,
  firstUserUpdated,
  firstUserIsNotAuth,
}

/* const pageNames = {
  eventsPage: 'events',
  profilePage: 'profile',
  oneEventPage: 'eventPage',
  registrationPage: 'registration',
  loginPage: 'login',
  logoutPage: 'logout',
};
*/

export const routes = {
  main: '/',
  events: '/events',
  profile: '/profile',
  oneEvent: '/event/{eventId}',
  signup: '/signup',
  login: '/login',
  logout: '/logout',
};
