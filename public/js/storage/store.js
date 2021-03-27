'use strict';
import {eventBus, channelNames} from '../eventBus/eventBus.js'

export class Store {
    constructor(eventBusik = eventBus) {
        this.eventBus = eventBusik;
        this.currentPage = 'main';
        this.userStore = null;
        this.eventsStore = null;
        this.currentEventStore = null;
    }

    reducer(action)  {
        if (action.eventName === 'changePage') {
            this.currentPage = action.data;
            eventBus.publish(channelNames.pageChanged);
            console.log(this.currentPage);
            return;
        }

        if (action.eventName.includes('user/')) {
            this.userStore.reducer(action);
            return;
        }

        if (action.eventName.includes('events/')) {
            this.eventsStore.reducer(action);
            return;
        }

        if (action.eventName.includes('oneEvent/')) {
            this.oneEventStore.reducer(action);
            return;
        }

    }

    getValidationErrors() {
        return this.validationErrors;
    }

    getCurrentPage() {
        return this.currentPage;
    }
}