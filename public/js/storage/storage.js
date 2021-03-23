import {postRegistrationData, getLoggedProfileData, getAllEventsJson, postLoginData, logoutFunc, getEventById} from '../networkModule/network.js'
import {validation} from '../validationModule/inputValidation.js'
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

    currentEventData: {},
    getCurrentEventData() {
        return this.currentEventData;
    },


    validationErrors: [],
    registerData: {
        errorLoginExist: false,
        validationErrors: [],
    },

    loginData: {
        errorWrongLoginOrPassword: false,
        validationErrors: [],
    },

    storeMethods: {
        registerData: async function(payload) {
            switch(payload.eventName) {
            case 'register':
                Store.validationErrors = validation(payload.data);
                
                if (Store.validationErrors.length) {
                    eventBus.publish(channelNames.errorValidation, null);
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

        loginUser: async function(payload) {
            switch(payload.eventName) {
            case 'login':
                Store.validationErrors = validation(payload.data);
                if (Store.validationErrors.length) {
                    eventBus.publish(channelNames.errorValidation, null);
                } else {
                    let answer = await postLoginData(payload.data);
                    if (answer.ok) {
                        Store.userData = await getLoggedProfileData();
                        Store.currentPage = pagesRoute.events;
                        eventBus.publish(channelNames.registerSuccessfull, null); // Попробовать не передавать null
                    } else {
                        Store.registerData.errorLoginExist = true;
                        eventBus.publish(channelNames.errorWrongLoginOrPassword, null);
                    }
                }
                break;
            }
        },

        updateUser: async function(payload) {
            switch(payload.eventName) {
                case 'updateUser':
                    Store.userData = await getLoggedProfileData();
                
                    if (Store.userData.message === 'user is not authorized') {
                        eventBus.publish(channelNames.userIsNotAuth, null);
                    } else {
                        eventBus.publish(channelNames.userUpdated, null);
                    }
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

        logout: async function(payload) {
            switch(payload.eventName) {
                case 'logout':
                    Store.userData = {};
                    logoutFunc();
                    eventBus.publish(channelNames.registerSuccessfull, null);  // register заменить на общее что-то
            }
        },

        oneEvent: async function(payload) {
            switch(payload.eventName) {
                case 'eventPage':
                    
                    Store.eventsData = await getEventById(payload.data);
                    eventBus.publish(channelNames.eventCome, null);  // register заменить на общее что-то
            }
        },
        
    },

    getValidationErrors() {
        return this.validationErrors;
    },
}
