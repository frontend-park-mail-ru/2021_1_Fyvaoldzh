'use strict';

import {eventComponent} from './renderModule/render';
import {renderEvents} from './renderModule/render';
import {renderSignUp} from './renderModule/render';
import {renderEventPage} from './renderModule/render';
import {renderLoginPage} from './renderModule/render';
import {renderLogout} from './renderModule/render';
import {renderProfilePage} from './renderModule/render';
import {renderMyProfilePage} from './renderModule/render';
import {renderMyEventsPage} from './renderModule/render';

export const imgUrl = 'http://95.163.180.8:1323/api/v1/avatar/';
export const imgEventUrl = 'http://95.163.180.8:1323/api/v1/event/';

export const urlMap = {
    main: renderEvents,
    signup: renderSignUp,
    back: renderEvents,
    eventPage: renderEventPage,
    login: renderLoginPage,
    profile: renderMyProfilePage,
    logout: renderLogout,
}

export async function init() {
    navbar.innerHTML = navbarTemplate({});
    renderLoggedNavbar();
    renderEvents();
}