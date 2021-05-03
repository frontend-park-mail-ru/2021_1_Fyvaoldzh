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
  customEventUrl: `${baseApi}/api/v1/search`,
  oneProfileUrl: `${baseApi}/api/v1/profile/`,
  customUserUrl: `${baseApi}/api/v1/users`,
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

export enum ChannelNames {
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
  oneProfileUpdated,
  userEventsButtonChanged,
  oneProfileEventsButtonChanged,
  searchUpdated,
  searchEventsButtonChanged,
  searchTabChanged,
  searchEventsPageChanged,
  searchUsersPageChanged,
  searchLoaderActivate,
  oneProfilePageChanged,
  profilePageChanged,
  profilePasswordChanged,
  followingsUpdated,
  followingsPageChanged,
  followingsTabChanged,
  chatUpdated,
}

export const routes = {
  main: '/',
  events: '/events',
  profile: '/profile',
  oneEvent: '/event/{eventId}',
  signup: '/signup',
  login: '/login',
  logout: '/logout',
  oneProfilePage: '/oneProfile',
  searchPage: '/searchPage',
  search: '/search',
  followings: '/profile/{profileId}/followings',
  chat: '/chat',
};

export const searchTab = {
  events: 'eventsTab',
  users: 'usersTab',
};

export const searchButton = {
  allEvents: 'allEventsButton',
  exhibition: 'exhibitionButton',
  concert: 'concertButton',
  museum: 'museumButton',
  entertainment: 'entertainmentButton',
  training: 'trainingButton',
  movie: 'movieButton',
  festival: 'festivalButton',
  excursion: 'excursionButton',
};

export const profileEventsButton = {
  planning: 'planningEventsButton',
  visited: 'visitedEventsButton',
};

export const followingsTab = {
  followedUsers: 'followedUsersTab',
  followers: 'followersTab',
};
