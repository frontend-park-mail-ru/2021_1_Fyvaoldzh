'use strict';

import {getLoggedProfileData, getProfileById} from '../networkModule/network.js';
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
    ava.style.background = `url(${evnt.target.result}) no-repeat`;
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
  let ava = document.getElementById('profileAvatar');
  ava.style.background = `url(${imgUrl + profileDataJson.Uid}) no-repeat center / cover`;

  let buttons = Array.from(document.getElementsByTagName('button'));
  buttons.forEach(element => {
    if (element.dataset.buttontype === 'toggle') {
      element.addEventListener('click', async e => {
        let {target} = e;
        if (target.classList.contains('button-inactive')) {
          let curActiveElem = target.parentNode.querySelector('.button-active');
          curActiveElem.classList.add('button-inactive');
          curActiveElem.classList.remove('button-active');
          target.classList.add('button-active');
          target.classList.remove('button-inactive');

          if (document.getElementById('planningEventsButton').classList.contains('button-active')) {
            await renderEventsList(profileDataJson.events);
          } else if (document.getElementById('visitedEventsButton').classList.contains('button-active')) {
            await renderEventsList(null);
          }
        }
      });
    }
  });

  if (document.getElementById('planningEventsButton').classList.contains('button-active')) {
    await renderEventsList(profileDataJson.events);
  } else if (document.getElementById('visitedEventsButton').classList.contains('button-active')) {
    await renderEventsList(null);
  }
}

export async function renderEventsList(events) {
  let eventsList = document.getElementById('events-list');
  eventsList.innerHTML = '';
  if (events === null) {
    let thereIsNothingGif = document.createElement('img');
    thereIsNothingGif.src = 'components/img/thereIsNothing.gif';
    thereIsNothingGif.style.marginBottom = '5%';
    eventsList.appendChild(thereIsNothingGif);
  } else {
    for (let curEventId in events) {
      const eventJson = await getEventById(events[curEventId]);
      eventsList.insertAdjacentHTML('beforeend', oneEventBlockTemplate(eventJson));
    }
  }
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

  wrapper.innerHTML = myProfileTemplate(profileDataJson);
  let ava = document.getElementById('profileAvatar');
  ava.style.background = `url(${imgUrl + profileDataJson.Uid}) no-repeat`;
  document.getElementById('imageFile').addEventListener('change', handleFileSelect);
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
