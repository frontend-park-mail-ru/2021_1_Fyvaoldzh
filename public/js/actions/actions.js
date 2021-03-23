import {dispatcher} from '../main.js'

export const actions = {
    register: function(registerData) {
        dispatcher.dispatch({
            eventName: 'register',
            data: registerData,
        });
    }
}
