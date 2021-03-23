import {postRegistrationData, getLoggedProfileData, getAllEventsJson} from '../networkModule/network.js'
import {validation} from '../validationModule/inputValidation.js'
import {renderSignUp} from '../views/register.js'
import {eventBus, channelNames} from '../eventBus/eventBus.js'


const pagesRoute = {
    events: '/events',
    profile: '/profile',
    register: '/register',
    login: '/login',
}

export const Store = {
    currentPage: 'main',
    getCurrentPage() {
        return this.currentPage;
    },

    userData: {},
    getUserData() {
        return this.userData;
    },

    eventsData: {},
    getEventsData() {
        return this.eventsData;
    },


    registerData: {
        errorLoginExist: false,
        validationErrors: [],
    },

    storeMethods: {
        registerData: async function(payload) {
            switch(payload.eventName) {
            case 'register':
                Store.registerData.validationErrors = validation(payload.data);
                
                if (Store.registerData.validationErrors.length) {
                    eventBus.publish(channelNames.errorValidationRegister, null);
                } else {
                    let answer = await postRegistrationData(payload.data);

                    if (answer.ok) {
                        Store.userData = await getLoggedProfileData();
                        Store.currentPage = pagesRoute.events;
                        eventBus.publish(channelNames.registerSuccessfull, null); // Попробовать не передавать null
                    } else {
                        Store.registerData.errorLoginExist = true;
                        eventBus.publish(channelNames.errorLoginIsExist, null);
                    }
                }
                break;

            
            }
        },

        updateUser: async function(payload) {
            switch(payload.eventName) {
                case 'updateUser':
                    Store.userData = await getLoggedProfileData();
                    eventBus.publish(channelNames.userUpdated, null);
            }
        },

        changePage: async function(payload) {
            switch(payload.eventName) {
                case 'changePage':
                    Store.currentPage = payload.data;
                    eventBus.publish(channelNames.pageChanged, null);
            }
        },

        updateEvents: async function(payload) {
            switch(payload.eventName) {
                case 'updateEvents':
                    Store.eventsData = await getAllEventsJson();
                    eventBus.publish(channelNames.eventsUpdated, null);
            }
        },

        
    },

    getRegisterValidationErrors() {
        return this.registerData.validationErrors;
    },
}
