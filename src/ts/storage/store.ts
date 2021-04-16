import UserStore from "./UserStore";
import EventsStore from "./EventsStore";
import OneEventStore from "./OneEventStore";
import RouterStore from "./RouterStore";
import EventBus from "../eventBus/eventBus";
import { ActionsInterface } from "../interfaces";
import OneProfileStore from "./OneProfileStore";
import SearchStoreDima from "./SearchStore";

export default class Store {
  public eventBus: EventBus;

  public userStore: UserStore;

  public eventsStore: EventsStore;

  public oneEventStore: OneEventStore;

  public routerStore: RouterStore;

  public oneProfileStore: OneProfileStore;

  public searchStore: SearchStoreDima;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
    this.userStore = new UserStore(this);
    this.eventsStore = new EventsStore(this);
    this.oneEventStore = new OneEventStore(this);
    this.routerStore = new RouterStore(this);
    this.oneProfileStore = new OneProfileStore(this);
    this.searchStore = new SearchStoreDima(this);
  }

  reducer(action: ActionsInterface) {
    if (action.eventName.includes("user/")) {
      this.userStore.reducer(action);
      return;
    }

    if (action.eventName.includes("events/")) {
      this.eventsStore.reducer(action);
      return;
    }

    if (action.eventName.includes("oneEvent/")) {
      this.oneEventStore.reducer(action);
      return;
    }

    if (action.eventName.includes("router/")) {
      this.routerStore.reducer(action);
      return;
    }

    if (action.eventName.includes("oneProfile/")) {
      this.oneProfileStore.reducer(action);
    }

    if (action.eventName.includes("search/")) {
      this.searchStore.reducer(action);
    }
  }
}
