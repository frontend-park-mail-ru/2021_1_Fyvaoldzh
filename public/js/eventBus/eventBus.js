export const eventBus = {
    channels: {},

    subscribe (channelName, listener) {
        if (!this.channels[channelName]) {
            this.channels[channelName] = [];
        }
        this.channels[channelName].push(listener);
    },

    publish (channelName, data) {
        const channel = this.channels[channelName];
        if (!channel || !channel.length) {
            return;
        }

        channel.forEach(listener => listener(data));
    }
}

export const channelNames = {
    errorValidationRegister: 'errorValidationRegister',
    errorValidationLogin: 'errorValidationLogin',
    errorLoginIsExist: 'errorLoginIsExist',
    errorWrongLoginOrPassword: 'errorWrongLoginOrPassword',
    registerSuccessfull: 'registerSuccessfull',
    userUpdated: 'userUpdated',
    pageChanged: 'pageChanged',
    eventsUpdated: 'eventsUpdated',
}

export const pageNames = {
    eventsPage: 'events',
    profilePage: 'profile',
    oneEventPage: 'event',
}