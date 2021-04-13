/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

import {updatePaginationState} from '../utils/utils.js';
import {profileEventsButton} from '../../config/config.js';

export default class ProfilesBaseView {
  constructor() {}

  renderEventsList(events) {
    // switch (this.constructor.name) {
    //   case 'SearchView':

    // updatePaginationState(searchPage, searchResultEvents.length);

    // break;

    // case 'OneProfileView':
    //   const oneProfilePage = this.globalStore.oneProfileStore.currentEventsPage;
    //   if (this.globalStore.oneProfileStore.currentEventsButton === profileEventsButton.planning) {
    //     const {oneProfilePlanningEvents} = this.globalStore.oneProfileStore;
    //     // updatePaginationState(oneProfilePage, oneProfilePlanningEvents.length);  //раскомментировать, когда на бэке будет пагинация
    //     updatePaginationState(oneProfilePage, 1);
    //   } else if (this.globalStore.oneProfileStore.currentEventsButton === profileEventsButton.events) {
    //     const {oneProfileVisitedEvents} = this.globalStore.oneProfileStore;
    //     // updatePaginationState(oneProfilePage, oneProfileVisitedEvents.length);  //тоже
    //     updatePaginationState(oneProfilePage, 1);
    //   }
    //   // const {searchResultEvents} = this.globalStore.searchStore;
    //   // updatePaginationState(currentEventsPage, searchResultEvents.length);
    //   break;
    // }
    // const {currentEventsPage} = this.globalStore.searchStore;
    // const {searchResultEvents} = this.globalStore.searchStore;

    window.scroll(0, 0);
    const eventsList = document.getElementById('events-list');
    let resultHTML = '';
    if (!events.length) {
      const nothingRow = document.createElement('div');
      nothingRow.className = 'profile-header';
      nothingRow.style.height = 'auto';
      nothingRow.style.alignItems = 'start';
      nothingRow.style.justifyContent = 'center';

      const thereIsNothing = document.createElement('H6');
      thereIsNothing.innerText = `Ничего не найдено =(`;
      thereIsNothing.style.fontSize = '24px';
      thereIsNothing.style.textAlign = 'center';
      thereIsNothing.style.marginBottom = '30px';

      nothingRow.appendChild(thereIsNothing);

      const externalElement = document.createElement('div');
      externalElement.appendChild(nothingRow);

      resultHTML = externalElement.innerHTML;
    } else {
      events.forEach(event => {
        if (event.startDate.includes(' +')) {
          event.startDate = event.startDate.split(' +', 1);
        }
        resultHTML += oneEventBlockTemplate(event);
      });
    }
    eventsList.innerHTML = resultHTML;

    // const {currentEventsPage} = this.globalStore.searchStore;
    // const {searchResultEvents} = this.globalStore.searchStore;
    // updatePaginationState(currentEventsPage, searchResultEvents.length);
  }
}
