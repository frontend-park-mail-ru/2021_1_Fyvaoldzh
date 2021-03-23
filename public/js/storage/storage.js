import {postRegistrationData} from '../networkModule/network.js'
import {validation} from '../validationModule/inputValidation.js'
import {renderSignUp} from '../views/register.js'

const pagesRoute = {
    events: '/events',
    profile: '/profile',
    register: '/register',
    login: '/login',
}

export class StorageApp {
    constructor() {
        this.user = {};
        this.currentPage = pagesRoute.events;
        this.registerData = {errorLoginExist: false,
                         validationErrors: []};
    }

    async register(payload) {
        switch(payload.eventName) {
            case 'register':
                this.registerData.validationErrors = validation(payload.data);
                console.log(this.registerData);
                let answer = await postRegistrationData(payload.data);
                if (answer.ok) {
                    this.currentPage = pagesRoute.events;
                } else {
                    this.registerData.errorLoginExist = true;
                }
                renderSignUp(this.registerData.validationErrors);
                break;
        }
    }
}