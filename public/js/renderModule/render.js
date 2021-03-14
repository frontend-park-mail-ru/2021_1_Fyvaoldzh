'use strict';

import {getLoggedProfileData} from '../networkModule/network.js';
import {getAllEventsJson, getEventById, logoutFunc} from '../networkModule/network.js';

export const imgUrl = 'http://95.163.180.8:1323/api/v1/avatar/';
export const imgEventUrl = 'http://95.163.180.8:1323/api/v1/event/';

export class eventComponent {
    constructor({
                    parent = document.body,
                    data = {},
                }) {
        this._parent = parent;
        this._data = data;
    }

    render() {

        const template = oneTableEventTemplate(this._data);

        this._parent.insertAdjacentHTML('beforeend', template)
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
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = signUpFormTemplate({});
}

export function renderLoginPage() {
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = loginTemplate();
    //logoutFunc();
}

export function renderLogout() {
    navbar.innerHTML = '';
    navbar.innerHTML = navbarTemplate({});
    logoutFunc();
    renderEvents();
}

export function renderProfilePage() {
    wrapper.style.background = 'url("components/img/profile-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = profileTemplate({});
}

export async function renderMyProfilePage() {
    wrapper.style.background = 'url("components/img/my-profile-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    let profileData = await getLoggedProfileData();
    let profileDataJson = await profileData.json();

    wrapper.innerHTML = myProfileTemplate(profileDataJson);
    let ava = document.getElementById('profileAvatar');
    ava.style.background = `url(${imgUrl + profileDataJson.Uid}) no-repeat`;
}

export function renderMyEventsPage() {
    wrapper.style.background = 'url("components/img/my-events-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = myEventsTemplate({});
}

export async function renderEventPage(Id) {
    window.scroll(0, 0);  //
    wrapper.style.backgroundImage =  'url("templates/one-event-page/img/event-page-background.jpg") no-repeat top right';
    wrapper.innerHTML = '';

    const eventJson = await getEventById(Id);
    wrapper.innerHTML = oneEventPageTemplate(eventJson);
}

export async function renderLoggedNavbar() {
    let loginCheck = await getLoggedProfileData();
    console.log(loginCheck.ok);
    if (loginCheck.ok) {

        let profileInfo = await loginCheck.json();
        navbar.innerHTML = '';
        navbar.innerHTML = navbarLoggedTemplate(profileInfo);
        let navbarAvatar = document.getElementById('navbar-avatar');

        navbarAvatar.style.background = `url(${imgUrl + profileInfo.Uid}) no-repeat center / cover`;
    }
}

