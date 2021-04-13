import { channelNames } from '../../config/config';
import EventComponent from './EventComponent';
import Store from "../../storage/store";
import Actions from "../../actions/actions";
const upperTextTemplate = require('Templates/events/upper-text.pug');

export default class EventsView {
  public globalStore: Store;
  public wrapper: HTMLElement;
  public actions: Actions;

  constructor(globalStore: Store, actions: Actions) {
    this.globalStore = globalStore;
    this.wrapper = document.getElementById('wrapper');
    this.actions = actions;
  }

  renderEvents() {
    /* if (this.globalStore.currentPage !== pageNames.eventsPage) {
      return;
    }
    */
    document.getElementById('wrapper').style.background = '../../../components/img/form-background.jpg';

    const eventsJson = this.globalStore.eventsStore.allEvents;
    this.wrapper.innerHTML = '';
    this.wrapper.style.background = 'url("templates/events/img/events-background.jpg") no-repeat';
    this.wrapper.innerHTML = upperTextTemplate({});

    const eventsRow = document.getElementById('events-row');

    Object.entries(eventsJson).forEach(([, val]) => {
      const innerEvent = new EventComponent(eventsRow, val);
      innerEvent.render();
    });

    this.renderCategoryButtons();
    window.addEventListener('scroll', this.infinityScroll.bind(this));
  }

  infinityScroll() {
    const eventsRow = document.getElementById('events-row');

    const contentHeight = eventsRow.offsetHeight;
    const windowOffsetY = window.pageYOffset;

    const windowHeight = window.innerHeight;

    if (windowOffsetY + windowHeight > contentHeight) {
      this.actions.uploadEventsContent();
    }
  }

  renderCategoryButtons() {
    if (!this.globalStore.userStore.userData) {
      document.getElementById('jsRecommendButton').style.display = 'none';
    }
    const categoryButtons = document.getElementsByClassName('category-button');
    Object.entries(categoryButtons).forEach(([key, val]:any) => {
      val.addEventListener('click', this.categoryButtonHandler.bind(this))
      if (val.dataset.category === this.globalStore.eventsStore.eventCategory) {
        this.toggleButton(val);
      }
    });
  }

  categoryButtonHandler(ev: MouseEvent) {
    const { target } = ev;
    if (target instanceof HTMLButtonElement && target.classList.contains('button-category_inactive')) {
      this.toggleButton(target);
      this.actions.changeEventCategory(target.dataset.category);
    }
  }

  toggleButton(button: HTMLButtonElement) {
    button.classList.toggle('button-category_inactive');
    button.classList.toggle('button-category_active');
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(channelNames.eventsUpdated, this.renderEvents.bind(this));
  }
}
