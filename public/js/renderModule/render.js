'use strict';

import {getLoggedProfileData, getProfileById} from '../networkModule/network.js';
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
    window.scroll(0, 0);
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = signUpFormTemplate({});
}

export function renderLoginPage() {
    window.scroll(0, 0);
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
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
        alert("Image only please....");
    }
    var reader = new FileReader();
    // Closure to capture the file information.

    reader.onload = function(evnt) {
        console.log(evnt.target.result);
        let ava = document.getElementById('profileAvatar');
        ava.style.background = `url(${evnt.target.result}) no-repeat`;
    }

    reader.readAsDataURL(file);
}


export async function renderProfilePage() {
    window.scroll(0, 0);
    wrapper.style.background = 'url("components/img/profile-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    let profileDataJson = await getProfileById();
    // let profileDataJson = await profileData.json();
    wrapper.innerHTML = profileTemplate(profileDataJson);
    let ava = document.getElementById('profileAvatar');
    // let profileDataJson = JSON.parse(profileData);
    ava.style.background = `url(${imgUrl + profileDataJson.Uid}) no-repeat center / cover`;
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
    window.scroll(0, 0);  //
    wrapper.style.backgroundImage =  'url("templates/one-event-page/img/event-page-background.jpg") no-repeat top right';
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

