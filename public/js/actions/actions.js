'use strict';

import {dispatcher} from '../main.js'

export const actions = {
    register: function(registerData) {
        dispatcher.dispatch({
            eventName: 'user/register',
            data: registerData,
        });
    },

    login: function(loginData) {
        dispatcher.dispatch({
            eventName: 'user/login',
            data: loginData,
        });
    },

    updateUser: function() {
        dispatcher.dispatch({
            eventName: 'user/update',
            data: null,
        });
    },

    logout: function() {
        dispatcher.dispatch({
            eventName: 'user/logout',
            data: null,
        });
    },

    changePage: function(page) {
        dispatcher.dispatch({
            eventName: 'changePage',
            data: page,
        });
    },

    updateEvents: function() {
        dispatcher.dispatch({
            eventName: 'events/update',
            data: null,
        });
    },

    eventPage: function(id) {
        dispatcher.dispatch({
            eventName: 'oneEvent/update',
            data: id,
        });
    },
}
