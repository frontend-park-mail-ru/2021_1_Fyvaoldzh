import { ChannelNames } from '../../config/config';
import EventComponent from './EventComponent';
import Store from '../../storage/store';
import Actions from '../../actions/actions';
import VirtualizedList from '../../virtualizedList/VirtualizedList';
import { getAllEventsJson, getRecommendEvents, getNearest } from '../../networkModule/network';

const upperTextTemplate = require('Templates/events/upper-text.pug');
const oneTableEventTemplate = require('Templates/events/one-table-event.pug');

function toggleButton(button: HTMLButtonElement) {
  button.classList.toggle('button-category_inactive');
  button.classList.toggle('button-category_active');
}

function categoryRequire(category: string) {
  return async function (page: number) {
    return await getAllEventsJson(page, category);
  }
}

interface Geoposition {
  latitude: number;
  longitude: number;
}

function geopositionLock(geoposition: Geoposition) {
  return async function (page: number) {
    return await getNearest(page, geoposition);
  }
}

export default class EventsView {
  public globalStore: Store;

  public wrapper: HTMLElement;

  public actions: Actions;

  public vList: VirtualizedList;

  constructor(globalStore: Store, actions: Actions) {
    this.globalStore = globalStore;
    this.wrapper = document.getElementById('wrapper');
    this.actions = actions;
    this.vList = null;
  }

  renderEvents() {
    /* if (this.globalStore.currentPage !== pageNames.eventsPage) {
      return;
    }
    */
    window.scroll(0, 0);
    document.title = 'События';
    const eventsJson = this.globalStore.eventsStore.allEvents;
    this.wrapper.innerHTML = '';
    this.wrapper.innerHTML = upperTextTemplate({});

    const eventsRow = document.getElementById('events-row');

    this.renderCategoryButtons();

    this.vList = new VirtualizedList({ height: 320,
      elementWrapperName: 'events-block',
      component: oneTableEventTemplate,
      container: document.getElementById('events-row'),
      data: this.globalStore.eventsStore.allEvents,
      onePageSize: 6,
      uploadContent: getAllEventsJson,
    });

    this.vList.initialize();
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

  async categoryButtonHandler(ev: MouseEvent) {
    const { target } = ev;
    if (target instanceof HTMLButtonElement && target.classList.contains('button-category_inactive')) {
      const activeButton = document.getElementsByClassName('button-category_active').item(0);
      activeButton.classList.toggle('button-category_active');
      activeButton.classList.toggle('button-category_inactive');

      target.classList.toggle('button-category_inactive');
      target.classList.toggle('button-category_active');

      this.vList.destroy();

      let reqFunction = categoryRequire(target.dataset.category);

      if (target.dataset.category === 'Рекомендации') {
        reqFunction = getRecommendEvents;
      }

      if (target.dataset.category === 'Ближайшие') {
        const geopos = this.globalStore.userStore.geolocation;

        reqFunction = geopositionLock({latitude: geopos[0], longitude: geopos[1]});
      }

      this.vList = new VirtualizedList({
        height: 320,
        elementWrapperName: 'events-block',
        component: oneTableEventTemplate,
        container: document.getElementById('events-row'),
        data: this.globalStore.eventsStore.allEvents,
        onePageSize: 6,
        uploadContent: reqFunction,
      });

      this.vList.initialize();
    }
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(ChannelNames.eventsUpdated, this.renderEvents.bind(this));
  }
}
