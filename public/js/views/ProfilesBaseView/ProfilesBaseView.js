/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

import {updatePaginationState} from '../utils/utils.js';

export default class ProfilesBaseView {
  constructor() {}

  renderEventsList = events => {
    const {currentEventsPage} = this.globalStore.searchStore;
    const {searchResultEvents} = this.globalStore.searchStore;

    window.scroll(0, 0);
    updatePaginationState(currentEventsPage, searchResultEvents.length);
    const eventsList = document.getElementById('events-list');
    let resultHTML = '';
    // console.log(events);
    // console.log(events.length);
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
  };
}
