'use strict';

import {getEventById} from '../networkModule/network.js';
import {channelNames} from '../eventBus/eventBus.js'

export class OneEventStore {
    constructor(globalStore) {
        this.globalStore = globalStore;
        globalStore.oneEventStore = this;
        this.data = null;
    }

    async update(action) {
        this.data = await getEventById(action.data);
        this.globalStore.eventBus.publish(channelNames.eventCome);
    }

    reducer(action) {
        switch (action.eventName) {
            case 'oneEvent/update':
                this.update(action);
                break;
        }
    }

    getData() {
        return this.data;
    }
}