'use strict';

import {getAllEventsJson} from './networkModule/network.js';
import {getEventById} from './networkModule/network.js';
import {postRegistationData} from './networkModule/network.js';
import {postLoginData} from './networkModule/network.js';

class eventComponent {
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
    }
}

const wrapper = document.getElementById('wrapper');
const navbar = document.getElementById('navbar');

navbar.innerHTML = navbarTemplate({});
wrapper.innerHTML = upperTextTemplate({});

const body = document.body;

const urlMap = {
    main: renderEvents,
    signup: renderSignUp,
    back: renderEvents,
    eventPage: renderEventPage,
    login: renderLoginPage,
}

async function renderEvents() {
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

function renderSignUp() {
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = signUpFormTemplate({});
}

body.addEventListener('click', async e => {
    const {target} = e;
    console.log(Object.prototype.toString.call(target));

    if (Object.prototype.toString.call(target) === '[object HTMLAnchorElement]') {
        e.preventDefault();
        urlMap[target.dataset.direction](target.dataset.eventid);
    }

    if (Object.prototype.toString.call(target) === '[object HTMLButtonElement]') {
        e.preventDefault();
        const formBody = document.getElementById('formBody');

        console.log(Object.prototype.toString.call(formBody));
        let dataFromForm = new FormData(formBody);
        let jsonData = JSON.stringify(Object.fromEntries(dataFromForm));

        console.log(jsonData); // Возвращает строку в лог с параметрами
        
        if (target.id === 'postRegistration') {
            let answer = await postRegistationData(jsonData);
            console.log(answer);
        }

        if (target.id === 'postLogin') {
            let answer = await postLoginData(jsonData);
            console.log(answer);
        }
    }
});

async function renderEventPage(Id) {
    wrapper.style.background =  'url("templates/one-event-page/img/event-page-background.jpg") no-repeat top right';
    wrapper.innerHTML = '';

    const eventJson = await getEventById(Id);
    wrapper.innerHTML = oneEventPageTemplate(eventJson);
}

function renderLoginPage() {
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = loginTemplate();
}

renderEvents();

/////////////////////////////////////////////////////////////////////////////////// network