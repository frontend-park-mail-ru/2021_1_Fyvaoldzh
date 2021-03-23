import {dispatcher} from '../main.js'

export const actions = {
    register: function(registerData) {
        dispatcher.dispatch({
            eventName: 'register',
            data: registerData,
        });
    },

    login: function(loginData) {
        dispatcher.dispatch({
            eventName: 'login',
            data: loginData,
        });
    },

    updateUser: function() {
        dispatcher.dispatch({
            eventName: 'updateUser',
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
            eventName: 'updateEvents',
            data: null,
        });
    },

    updateProfileData: function() {
        dispatcher.dispatch({
            eventName: 'updateProfileData',
            data: null,
        });
    },

    logout: function() {
        dispatcher.dispatch({
            eventName: 'logout',
            data: null,
        });
    },

    eventPage: function(id) {
        dispatcher.dispatch({
            eventName: 'eventPage',
            data: id,
        });
    },
}
