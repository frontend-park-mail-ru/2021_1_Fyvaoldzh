'use strict';

import {getLoggedProfileData} from '../networkModule/network.js';
import {getAllEventsJson, getEventById, logoutFunc} from '../networkModule/network.js';

export const imgUrl = 'http://95.163.180.8:1323/api/v1/avatar/';
export const imgEventUrl = 'http://95.163.180.8:1323/api/v1/event/';

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
        ava.style.background = `url(${evnt.target.result}) no-repeat center / cover`;
    }

    reader.readAsDataURL(file);
}


export function renderProfilePage() {
    window.scroll(0, 0);
    wrapper.style.background = 'url("components/img/profile-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = profileTemplate({});
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
