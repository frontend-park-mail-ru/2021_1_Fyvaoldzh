import {dispatcher} from '../main.js'

export const actions = {
    register: function(registerData) {
        dispatcher.dispatch({
            eventName: 'register',
            data: registerData,
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
}
