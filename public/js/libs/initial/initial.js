'use strict';

import {renderLoggedNavbar} from '../render/render.js';
import {renderEvents} from '../render/render.js';
import {renderSignUp} from '../render/render.js';
import {renderEventPage} from '../render/render.js';
import {renderLoginPage} from '../render/render.js';
import {renderLogout} from '../render/render.js';
import {renderProfilePage} from '../render/render.js';
import {renderMyProfilePage} from '../render/render.js';
import {renderMyEventsPage} from '../render/render.js';


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