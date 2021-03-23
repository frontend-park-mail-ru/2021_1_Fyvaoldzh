import {Store} from '../storage/storage.js'
import {INPUTS} from '../validationModule/validation.js'
import {eventBus, channelNames, pageNames} from '../eventBus/eventBus.js'
import {actions} from '../actions/actions.js';
import {urlMap} from '../config/config.js'

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
        console.log('ya zhiv');
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
    const validationErrors = Store.getRegisterValidationErrors();
    document.getElementById('loginError').innerText = '';  // вопросики
    document.getElementById('passwordError').innerText = '';
    document.getElementById('nicknameError').innerText = '';

    for (let i in validationErrors) { // TODO переделать на foreach()
        switch (validationErrors[i]) {
            case 'login':
                document.getElementById('loginError').innerText = INPUTS.login.errorMsg;
                break;

            case 'password':
                document.getElementById('passwordError').innerText = INPUTS.password.errorMsg;
                break;

            case 'name':  // Nickname / name исправить все на одно
                document.getElementById('nicknameError').innerText = INPUTS.name.errorMsg;
                break;

        }
    }
}

export function renderSignUp() {
    window.scroll(0, 0);
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = signUpFormTemplate({});
}

function changePage() {
    const currentPage = Store.getCurrentPage();
    switch (currentPage) {
        case pageNames.eventsPage:
            actions.updateEvents();
            break;
    }
}

function onRegisterSuccessfull() {
    actions.updateUser();
    actions.changePage(pageNames.eventsPage);
}

export function subscribeViews() {
    eventBus.subscribe(channelNames.errorValidationRegister, renderValidationErrors);
    eventBus.subscribe(channelNames.registerSuccessfull, onRegisterSuccessfull);

    eventBus.subscribe(channelNames.userUpdated, renderLoggedNavbar);
    eventBus.subscribe(channelNames.eventsUpdated, renderEvents);

    eventBus.subscribe(channelNames.pageChanged, changePage);
}