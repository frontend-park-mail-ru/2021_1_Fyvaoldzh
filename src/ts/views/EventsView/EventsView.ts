import { ChannelNames } from '../../config/config';
import EventComponent from './EventComponent';
import Store from '../../storage/store';
import Actions from '../../actions/actions';

const upperTextTemplate = require('Templates/events/upper-text.pug');

function toggleButton(button: HTMLButtonElement) {
  button.classList.toggle('button-category_inactive');
  button.classList.toggle('button-category_active');
}

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
    const eventsJson = this.globalStore.eventsStore.allEvents;
    this.wrapper.innerHTML = '';
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
    if (!eventsRow) {
      return;
    }

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
    Object.entries(categoryButtons).forEach(([, val]:any) => {
      val.addEventListener('click', this.categoryButtonHandler.bind(this));
      if (val.dataset.category === this.globalStore.eventsStore.eventCategory) {
        toggleButton(val);
      }
    });
  }

  categoryButtonHandler(ev: MouseEvent) {
    const { target } = ev;
    if (target instanceof HTMLButtonElement && target.classList.contains('button-category_inactive')) {
      toggleButton(target);
      this.actions.changeEventCategory(target.dataset.category);
    }
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(ChannelNames.eventsUpdated, this.renderEvents.bind(this));
  }
}
