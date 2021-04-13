export const urlMap = {
  allEventsUrl: 'http://95.163.180.8:1323/api/v1/',
  oneEventUrl: 'http://95.163.180.8:1323/api/v1/event/',
  customEventUrl: 'http://95.163.180.8:1323/api/v1/search',
  oneProfileUrl: 'http://95.163.180.8:1323/api/v1/profile/',
  customUserUrl: 'http://95.163.180.8:1323/api/v1/users',
  postLoginDataUrl: 'http://95.163.180.8:1323/api/v1/login',
  postRegistrationDataUrl: 'http://95.163.180.8:1323/api/v1/register',
  currentProfileUrl: 'http://95.163.180.8:1323/api/v1/profile',
  logout: 'http://95.163.180.8:1323/api/v1/logout',
  putAvatarUrl: 'http://95.163.180.8:1323/api/v1/upload_avatar',
  imgUrl: 'http://95.163.180.8:1323/api/v1/avatar/',
  imgEventUrl: 'http://95.163.180.8:1323/api/v1/event/',
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

export const searchTab = {
  events: 'eventsTab',
  users: 'usersTab',
};

export const profileEventsButton = {
  planning: 'planningEventsButton',
  visited: 'visitedEventsButton',
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

export const channelNames = {
  errorValidation: 'errorValidation',
  errorLoginIsExist: 'errorLoginIsExist',
  errorWrongLoginOrPassword: 'errorWrongLoginOrPassword',
  registerSuccessfull: 'registerSuccessfull',
  userUpdated: 'userUpdated',
  pageChanged: 'pageChanged',
  eventsUpdated: 'eventsUpdated',
  logoutSuccessfull: 'logoutSuccessfull',
  userIsNotAuth: 'userIsNotAuth',
  eventCome: 'eventCome',
  tabChanged: 'tabChanged',
  avatarPreview: 'avatarPreview',
  avatarDeclined: 'avatarDeclined',
  avatarPushed: 'avatarPushed', // Мб имена каналов и всякое такое стоит заменить на что-то типа enum.
  oneProfileUpdated: 'oneProfileUpdated',
  userEventsButtonChanged: 'userEventsButtonChanged',
  oneProfileEventsButtonChanged: 'oneProfileEventsButtonChanged',
  searchUpdated: 'searchUpdated',
  searchEventsButtonChanged: 'searchEventsButtonChanged',
  searchTabChanged: 'searchTabChanged',
  searchEventsPageChanged: 'searchEventsPageChanged',
  searchUsersPageChanged: 'searchUsersPageChanged',
};

export const pageNames = {
  eventsPage: 'events',
  profilePage: 'profile',
  oneEventPage: 'eventPage',
  registrationPage: 'registration',
  loginPage: 'login',
  logoutPage: 'logout',
  oneProfilePage: 'oneProfile',
  searchPage: 'searchPage',
};
