'use strict';

import { getAllEventsJson } from '../networkModule/network.js';
import { channelNames } from '../config/config.js';

export class EventsStore {
    constructor(globalStore) {
        this.globalStore = globalStore;
        this.globalStore.eventsStore = this;
        this.data = null;
    }

    async update(action) {
        this.data = await getAllEventsJson();
        this.globalStore.eventBus.publish(channelNames.eventsUpdated);
    }

    reducer(action) {
        switch (action.eventName) {
            case 'events/update':
                this.update(action);
                break;
        }
    }

    getData() {
        return this.data;
    }
}