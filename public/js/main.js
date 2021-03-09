'use strict';

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

let events_json = {
    '0': {
        Title: 'Первое мега событие',
        Place: 'Где-то там',
        Description: 'Супер',
        Date: '12 мая',
        Subway: 'Метро Петровско-Разумовская',
        Street: 'Улица Пушкина, дом Колотушкина',
        Id: 0,
    },
    '1': {
        Title: 'А это еще лучше',
        Place: 'Общага',
        Date: '13 апреля',
        Subway: 'Метро Измайловская',
        Street: 'Измайловский проспект 73А',
        Description: 'Ваще круто',
        Id: 1,
    },
    '2': {
        Title: 'Лучше не приходить',
        Place: 'Бауманка',
        Description: 'Тут пары',
        Subway: 'Метро Бауманская',
        Date: 'Пн-Сб',
        Street: 'Госпитальный пер.',
        Id: 2,
    },
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

function renderEvents() {
    wrapper.innerHTML = '';
    wrapper.style.background = 'url("templates/events/img/events-background.jpg") no-repeat';
    wrapper.innerHTML = upperTextTemplate({});

    const eventsRow = document.getElementById('events-row');
    
    for (let i in events_json) {
        const innerEvent = new eventComponent({parent: eventsRow, data: events_json[i]});
        innerEvent.render();
    }
}

function renderSignUp() {
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = signUpFormTemplate({});
}

body.addEventListener('click', e => {
    const {target} = e;

    if (Object.prototype.toString.call(target) === '[object HTMLAnchorElement]') {
        e.preventDefault();
        urlMap[target.dataset.direction](target.dataset.eventid);
    }
});

function renderEventPage(Id) {
    wrapper.style.background =  'url("templates/one-event-page/img/event-page-background.jpg") no-repeat top right';
    wrapper.innerHTML = '';
    wrapper.innerHTML = oneEventPageTemplate(events_json[Id]);
}

function renderLoginPage() {
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = loginTemplate();
}

renderEvents();