'use strict';

import {getLoggedProfileData, getProfileById, putAvatar} from '../networkModule/network.js';
import {getAllEventsJson, getEventById, logoutFunc} from '../networkModule/network.js';
// import * as url from "url";

export const imgUrl = 'http://95.163.180.8:1323/api/v1/avatar/';
export const imgEventUrl = 'http://95.163.180.8:1323/api/v1/event/';

export class eventComponent {
  constructor({parent = document.body, data = {}}) {
    this._parent = parent;
    this._data = data;
  }

  render() {
    const template = oneTableEventTemplate(this._data);

    this._parent.insertAdjacentHTML('beforeend', template);
    let eventGet = document.getElementById(this._data.id);

    eventGet.style.background = `url(${imgEventUrl + this._data.id}/image) no-repeat top / cover`;
  }
}

export async function renderEvents() {
  window.scroll(0, 0);
  wrapper.innerHTML = '';
  wrapper.style.background = 'url("templates/events/img/events-background.jpg") no-repeat';
  wrapper.innerHTML = upperTextTemplate({});

  const eventsRow = document.getElementById('events-row');

  let eventsJson = await getAllEventsJson();
  for (let i in eventsJson) {
    const innerEvent = new eventComponent({parent: eventsRow, data: eventsJson[i]});
    innerEvent.render();
  }
}

export function renderSignUp() {
  window.scroll(0, 0);
  wrapper.style.background = 'url("components/img/form-background.jpg") no-repeat top / cover';
  wrapper.innerHTML = '';
  wrapper.innerHTML = signUpFormTemplate({});
}

export function renderLoginPage() {
  window.scroll(0, 0);
  wrapper.style.background = 'url("components/img/form-background.jpg") no-repeat top / cover';
  wrapper.innerHTML = '';
  wrapper.innerHTML = loginTemplate();
  //logoutFunc();
}

export function renderLogout() {
  window.scroll(0, 0);
  navbar.innerHTML = '';
  navbar.innerHTML = navbarTemplate({});
  logoutFunc();
  renderEvents();
}

async function handleFileSelect(e) {
  var file = e.target.files[0];
  // Только изображения.
  if (!file.type.match('image.*')) {
    alert('Image only please....');
  }
  var reader = new FileReader();
  // Closure to capture the file information.

  reader.onload = function (evnt) {
    console.log(evnt.target.result);
    let ava = document.getElementById('profileAvatar');
    ava.style.background = `url(${evnt.target.result}) no-repeat center / cover`;
  };

  reader.readAsDataURL(file);
}

export async function renderProfilePage() {
  window.scroll(0, 0);
  wrapper.style.background = 'url("components/img/profile-background.jpg") no-repeat top / cover';
  wrapper.innerHTML = '';
  let profileDataJson = await getProfileById();

  profileDataJson.age += await addDeclensionOfNumbers(profileDataJson.age, [' год', ' года', ' лет']);
  profileDataJson.followers += await addDeclensionOfNumbers(profileDataJson.followers, [
    ' подписчик',
    ' подписчика',
    ' подписчиков',
  ]);

  wrapper.innerHTML = profileTemplate(profileDataJson);
  wrapper.querySelector('.profile-main-block').insertAdjacentHTML('beforeend', myProfileEventsTabTemplate());

  let ava = document.getElementById('profileAvatar');
  ava.style.background = `url(${imgUrl + profileDataJson.Uid}) no-repeat center / cover`;

  let buttons = Array.from(document.getElementsByTagName('button'));
  buttons.forEach(element => {
    if (element.dataset.buttontype === 'toggle') {
      let buttonToggleHandlerObject = {
        profileDataJson: profileDataJson,
      };
      buttonToggleHandlerObject.handlerFunc = buttonToggleHandler;

      element.addEventListener('click', buttonToggleHandlerObject.handlerFunc.bind(buttonToggleHandlerObject));
    }
  });
  if (document.getElementById('planningEventsButton').classList.contains('button-active')) {
    await renderEventsList(profileDataJson.events);
  } else if (document.getElementById('visitedEventsButton').classList.contains('button-active')) {
    await renderEventsList(null);
  }
}

async function buttonToggleHandler(e) {
  let {target} = e;

  if (target.classList.contains('tab-inactive')) {
    let curActiveElem = target.parentNode.querySelector('.tab-active');
    curActiveElem.classList.add('tab-inactive');
    target.classList.add('tab-active');
    target.classList.remove('tab-inactive');
    curActiveElem.classList.remove('tab-active');

    if (document.getElementById('eventsTab').classList.contains('tab-active')) {
      await renderMyProfileEventsTab(this.profileDataJson);
    } else if (document.getElementById('aboutTab').classList.contains('tab-active')) {
      await renderMyProfileAboutTab(this.profileDataJson);
    } else if (document.getElementById('settingsTab').classList.contains('tab-active')) {
      await renderMyProfileSettingsTab();
    }
  }

  if (target.classList.contains('button-inactive')) {
    let curActiveElem = target.parentNode.querySelector('.button-active');
    curActiveElem.classList.add('button-inactive');
    target.classList.add('button-active');
    target.classList.remove('button-inactive');
    curActiveElem.classList.remove('button-active');

    if (document.getElementById('planningEventsButton').classList.contains('button-active')) {
      await renderEventsList(this.profileDataJson.events);
    } else if (document.getElementById('visitedEventsButton').classList.contains('button-active')) {
      await renderEventsList(null);
    }
  }
}

export async function renderEventsList(events) {
  let eventsList = document.getElementById('events-list');
  let resultHTML = '';
  if (events === null) {
    let thereIsNothingGif = document.createElement('img');
    thereIsNothingGif.src = 'components/img/thereIsNothing.gif';
    thereIsNothingGif.style.marginBottom = '5%';

    let nothingRow = document.createElement('div');
    nothingRow.className = 'profile-header';
    nothingRow.style.height = 'auto';
    nothingRow.style.alignItems = 'start';
    nothingRow.style.justifyContent = 'space-around';
    // nothingRow.style.padding = '0 5%';

    let someTextBefore = document.createElement('H6');
    someTextBefore.innerText = 'тут ничего нет';
    someTextBefore.style.fontSize = '24px';
    someTextBefore.style.marginTop = '40px';
    // someTextBefore.style.width = '100%';
    someTextBefore.style.textAlign = 'center';

    let someTextAfter = document.createElement('H6');
    someTextAfter.innerText = 'тут тоже';
    someTextAfter.style.fontSize = '24px';
    someTextAfter.style.marginTop = '40px';
    // someTextAfter.style.width = '100%';
    someTextAfter.style.textAlign = 'center';

    nothingRow.appendChild(someTextBefore);
    nothingRow.appendChild(thereIsNothingGif);
    nothingRow.appendChild(someTextAfter);

    let externalElement = document.createElement('div');
    externalElement.appendChild(nothingRow);

    resultHTML = externalElement.innerHTML;
  } else {
    for (let curEventId in events) {
      const eventJson = await getEventById(events[curEventId]);
      resultHTML += oneEventBlockTemplate(eventJson);
    }
  }
  eventsList.innerHTML = resultHTML;
}

async function addDeclensionOfNumbers(number, titles) {
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

export async function renderMyProfilePage() {
  window.scroll(0, 0);
  wrapper.style.background = 'url("components/img/my-profile-background.jpg") no-repeat top / cover';
  wrapper.innerHTML = '';
  let profileData = await getLoggedProfileData();
  let profileDataJson = await profileData.json();

  profileDataJson.followers += await addDeclensionOfNumbers(profileDataJson.followers, [
    ' подписчик',
    ' подписчика',
    ' подписчиков',
  ]);

  wrapper.innerHTML = myProfileTemplate(profileDataJson);
  let ava = document.getElementById('profileAvatar');
  ava.style.background = `url(${imgUrl + profileDataJson.Uid}) no-repeat center / cover`;
  // document.getElementById('postAvatarProfile').addEventListener('change', handleFileSelect);
  document.getElementById('postAvatarProfile').addEventListener('change', changeAvatarHandler);

  let buttons = Array.from(document.getElementsByTagName('button'));
  buttons.forEach(element => {
    if (element.dataset.buttontype === 'toggle') {
      let buttonToggleHandlerObject = {
        profileDataJson: profileDataJson,
      };
      buttonToggleHandlerObject.handlerFunc = buttonToggleHandler;

      element.addEventListener('click', buttonToggleHandlerObject.handlerFunc.bind(buttonToggleHandlerObject));
    }
  });

  if (document.getElementById('eventsTab').classList.contains('tab-active')) {
    await renderMyProfileEventsTab(profileDataJson);
  } else if (document.getElementById('aboutTab').classList.contains('tab-active')) {
    await renderMyProfileAboutTab(profileDataJson);
  } else if (document.getElementById('settingsTab').classList.contains('tab-active')) {
    await renderMyProfileSettingsTab();
  }
}

export async function changeAvatarHandler(e) {
  if (!e.target.value) {
    alert('Не выбран аватар');
  } else if (!e.target.files[0].type.match('image.*')) {
    alert('Только картинки, пожалуйста...');
  } else {
    let photo = e.target.files[0];
    let formPut = new FormData();
    formPut.append('avatar', photo);
    console.log(formPut);
    let answ = await putAvatar(formPut);
    if (answ.ok) {
      let loginCheck = await getLoggedProfileData();
      let profileInfo = await loginCheck.json();
      let navbarRow = document.getElementById('navbarRow');

      let navbarAvatar = document.getElementById('navbar-avatar');
      let avaProfile = document.getElementById('profileAvatar');

      fetch(`${imgUrl + profileInfo.Uid}`)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onload = function () {
            navbarAvatar.style.background = `url(${this.result}) no-repeat center / cover`;
            avaProfile.style.background = `url(${this.result}) no-repeat center / cover`;
          };
          reader.readAsDataURL(blob);
        });
    } else {
      //alert('неведомая ошибка');
    }
  }
}

export async function renderMyProfileEventsTab(profileDataJson) {
  let changingContent = document.getElementById('changing-content');
  changingContent.innerHTML = myProfileEventsTabTemplate();

  let buttons = Array.from(changingContent.getElementsByTagName('button'));
  buttons.forEach(element => {
    if (element.dataset.buttontype === 'toggle') {
      let buttonToggleHandlerObject = {
        profileDataJson: profileDataJson,
      };
      buttonToggleHandlerObject.handlerFunc = buttonToggleHandler;

      element.addEventListener('click', buttonToggleHandlerObject.handlerFunc.bind(buttonToggleHandlerObject));
    }
  });

  if (document.getElementById('planningEventsButton').classList.contains('button-active')) {
    await renderEventsList(profileDataJson.events);
  } else if (document.getElementById('visitedEventsButton').classList.contains('button-active')) {
    await renderEventsList(null);
  }
}

export async function renderMyProfileAboutTab(profileDataJson) {
  let changingContent = document.getElementById('changing-content');
  changingContent.innerHTML = myProfileAboutTabTemplate(profileDataJson);
}

export async function renderMyProfileSettingsTab() {
  let changingContent = document.getElementById('changing-content');
  changingContent.innerHTML = myProfileSettingsTabTemplate();
}

export function renderMyEventsPage() {
  window.scroll(0, 0);
  wrapper.style.background = 'url("components/img/my-events-background.jpg") no-repeat top / cover';
  wrapper.innerHTML = '';
  wrapper.innerHTML = myEventsTemplate({});
}

export async function renderEventPage(Id) {
  window.scroll(0, 0); //
  wrapper.style.backgroundImage =
    'url("templates/one-event-page/img/event-page-background.jpg") no-repeat top right';
  wrapper.innerHTML = '';

  const eventJson = await getEventById(Id);
  wrapper.innerHTML = oneEventPageTemplate(eventJson);
}

export async function renderLoggedNavbar() {
  window.scroll(0, 0);
  let loginCheck = await getLoggedProfileData();

  if (loginCheck.ok) {
    let profileInfo = await loginCheck.json();
    navbar.innerHTML = '';
    navbar.innerHTML = navbarLoggedTemplate(profileInfo);
    let navbarAvatar = document.getElementById('navbar-avatar');

    navbarAvatar.style.background = `url(${imgUrl + profileInfo.Uid}) no-repeat center / cover`;
  }
}
