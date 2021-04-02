export const urlMap = {
  allEventsUrl: 'http://95.163.180.8:1323/api/v1/',
  oneEventUrl: 'http://95.163.180.8:1323/api/v1/event/',
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
};

export const pageNames = {
  eventsPage: 'events',
  profilePage: 'profile',
  oneEventPage: 'eventPage',
  registrationPage: 'registration',
  loginPage: 'login',
  logoutPage: 'logout',
};

export const storeSymbols = {
  currentPageSymbol: Symbol('currentPageSymbol'),
  oneEventStoreSymbol: Symbol('oneEventStoreSymbol'),
  userStoreSymbol: Symbol('userStoreSymbol'),
  eventsStoreSymbol: Symbol('eventsStoreSymbol'),
};

export const userStoreSymbols = {
  userDataSymbol: Symbol('UserData'),
  currentTabSymbol: Symbol('CurrentTabSymbol'),
  validationErrorsSymbol: Symbol('validationErrorsSymbol'),
  avatarPreviewUrlSymbol: Symbol('avatarPreviewUrlSymbol'),
};
