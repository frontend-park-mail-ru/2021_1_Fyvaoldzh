'use strict';

import {Store} from '../storage/storage.js'
import {INPUTS} from '../validationModule/validation.js'
import {eventBus, channelNames, pageNames} from '../eventBus/eventBus.js'
import {actions} from '../actions/actions.js';
import {urlMap, SERVER_ERRORS} from '../config/config.js'

// Тута все представления для отрисовки

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

        eventGet.style.background = `url(${urlMap.imgEventUrl + this._data.id}/image) no-repeat top / cover`;
    }
}

function renderEvents() {
    if (Store.getCurrentPage() != pageNames.eventsPage) {
        return;
    }
    const eventsJson = Store.getEventsData();
    window.scroll(0, 0);
    wrapper.innerHTML = '';
    wrapper.style.background = 'url("templates/events/img/events-background.jpg") no-repeat';
    wrapper.innerHTML = upperTextTemplate({});

    const eventsRow = document.getElementById('events-row');

    for (let i in eventsJson) {
        const innerEvent = new eventComponent({parent: eventsRow, data: eventsJson[i]});
        innerEvent.render();
    }
}

function renderLoggedNavbar() {
    window.scroll(0, 0);
    
    let profileData = Store.getUserData();
    navbar.innerHTML = '';
    navbar.innerHTML = navbarLoggedTemplate(profileData);
    let navbarAvatar = document.getElementById('navbar-avatar');

    navbarAvatar.style.background = `url(${urlMap.imgUrl + profileData.Uid}) no-repeat center / cover`;   
}


function renderValidationErrors() {
    const validationErrors = Store.getValidationErrors();
    document.getElementById('loginError').innerText = '';  // вопросики
    document.getElementById('passwordError').innerText = '';
    if (document.getElementById('nicknameError')) {
        document.getElementById('nicknameError').innerText = '';
    }

    document.getElementsByName('login').forEach(el => el.style = null);
    document.getElementsByName('password').forEach(el => el.style = null);
    document.getElementsByName('name').forEach(el => el.style = null);

    for (let i in validationErrors) { // TODO переделать на foreach() (если возможно)
        switch (validationErrors[i]) {
            case 'login':
                document.getElementsByName('login').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
                document.getElementById('loginError').innerText = INPUTS.login.errorMsg;
                break;

            case 'password':
                document.getElementsByName('password').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
                document.getElementById('passwordError').innerText = INPUTS.password.errorMsg;
                break;

            case 'name':  // Nickname / name исправить все на одно
                document.getElementsByName('name').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
                document.getElementById('nicknameError').innerText = INPUTS.name.errorMsg;
                break;

            case 'loginExist':
                document.getElementsByName('login').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
                document.getElementById('nicknameError').innerText = SERVER_ERRORS.LOGIN_EXIST;
                break;

            case 'wrongLoginOrPass':
                document.getElementsByName('login').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
                document.getElementsByName('password').forEach(el => el.style.boxShadow = '0px 0px 10px 0px #CE0E50');
                document.getElementById('passwordError').innerText = SERVER_ERRORS.WRONG_LOGIN_OR_PASS;

        }
    }
}

function renderSignUp() {
    window.scroll(0, 0);
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = signUpFormTemplate({});
}

function renderLoginPage() {
    window.scroll(0, 0);
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = loginTemplate();
}

function renderLogout() {
    window.scroll(0, 0);
    navbar.innerHTML = '';
    navbar.innerHTML = navbarTemplate({});
    renderEvents();
}

function renderNavbar() {
    window.scroll(0, 0);
    navbar.innerHTML = '';
    navbar.innerHTML = navbarTemplate({});
}

function changePage() {
    const currentPage = Store.getCurrentPage();
    switch (currentPage) {
        case pageNames.eventsPage:
            actions.updateEvents();
            break;
        case pageNames.profilePage:
            console.log('adwjjwda');
            actions.updateUser();
            break;
        case pageNames.registrationPage:
            renderSignUp();
            break;
        case pageNames.loginPage:
            renderLoginPage();
            break;
        case pageNames.logoutPage:
            renderLogout();
            break;
        case pageNames.oneEventPage:
            
    }
}


function onRegisterSuccessfull() {
    actions.updateUser();
    actions.changePage(pageNames.eventsPage);
}

function renderEventPage() {
    const eventData = Store.getEventsData();
    window.scroll(0, 0);
    wrapper.style.backgroundImage =  'url("templates/one-event-page/img/event-page-background.jpg") no-repeat top right';
    wrapper.innerHTML = '';

    wrapper.innerHTML = oneEventPageTemplate(eventData);
}


function handleFileSelect(e) {
    const file = e.target.files[0]; 
    // Только изображения.
    if (!file.type.match('image.*')) {
        alert("Image only please....");
    }
    const reader = new FileReader();
    // Closure to capture the file information.

    reader.onload = function(evnt) {
        console.log(evnt.target.result);
        let ava = document.getElementById('profileAvatar');
        ava.style.background = `url(${evnt.target.result}) no-repeat center / cover`;
    }

    reader.readAsDataURL(file);
}

function renderMyProfilePage() {
    if (Store.getCurrentPage() != pageNames.profilePage) {
        return;
    }
    window.scroll(0, 0);
    const profileData = Store.getUserData();

    wrapper.style.background = 'url("components/img/my-profile-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = myProfileTemplate(profileData);

    let ava = document.getElementById('profileAvatar');
    ava.style.background = `url(${urlMap.imgUrl + profileData.Uid}) no-repeat`;
    document.getElementById('imageFile').addEventListener('change', handleFileSelect);
}

export function subscribeViews() {
    eventBus.subscribe(channelNames.errorValidation, renderValidationErrors);
    eventBus.subscribe(channelNames.registerSuccessfull, onRegisterSuccessfull);

    eventBus.subscribe(channelNames.userUpdated, renderLoggedNavbar);
    eventBus.subscribe(channelNames.eventsUpdated, renderEvents);

    eventBus.subscribe(channelNames.userUpdated, renderMyProfilePage);
    eventBus.subscribe(channelNames.pageChanged, changePage);

    eventBus.subscribe(channelNames.logoutSuccessfull, renderLogout);
    eventBus.subscribe(channelNames.userIsNotAuth, renderNavbar);

    eventBus.subscribe(channelNames.eventCome, renderEventPage)
}