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

export function renderMyEventsPage() {
    window.scroll(0, 0);
    wrapper.style.background = 'url("components/img/my-events-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = myEventsTemplate({});
}