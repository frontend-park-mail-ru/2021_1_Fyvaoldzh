'use strict';

import {renderSignUp} from '../renderModule/render.js';
import {renderEventPage} from '../renderModule/render.js';
import {renderLoginPage} from '../renderModule/render.js';
import {renderLogout} from '../renderModule/render.js';
import {renderProfilePage} from '../renderModule/render.js';
import {renderMyProfilePage} from '../renderModule/render.js';
import {renderMyEventsPage} from '../renderModule/render.js';


export const urlMap = {

    signup: renderSignUp,

    eventPage: renderEventPage,
    login: renderLoginPage,
    profile: renderMyProfilePage,
    logout: renderLogout,
}

export async function init() {
    navbar.innerHTML = navbarTemplate({});
}