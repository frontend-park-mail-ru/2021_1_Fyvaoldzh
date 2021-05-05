import { parseDate } from '../utils/utils';

const oneEventBlockTemplate = require('../../../templates/one-event-block/one-event-block.pug');

export default class ProfilesBaseView {
  // constructor() {}

  // public renderEventsList(events: any) {  //реализаци Димы
  public renderEventsList(events: Array<any>) {
    // моя реализация
    const eventsList = document.getElementById('events-list');
    let resultHTML = '';
    if (!events?.length) {
      const nothingRow = document.createElement('div');
      nothingRow.className = 'profile-header';
      nothingRow.style.height = 'auto';
      nothingRow.style.alignItems = 'start';
      nothingRow.style.justifyContent = 'center';

      const thereIsNothing = document.createElement('H6');
      thereIsNothing.innerText = 'Тут пока пусто =(';
      thereIsNothing.style.fontSize = '24px';
      thereIsNothing.style.textAlign = 'center';
      thereIsNothing.style.marginBottom = '30px';
      thereIsNothing.style.alignSelf = 'center';

      nothingRow.appendChild(thereIsNothing);

      const externalElement = document.createElement('div');
      externalElement.appendChild(nothingRow);

      resultHTML = externalElement.innerHTML;
    } else {
      // events.forEach((event: any) => {  //реализация Димы
      events.forEach((event) => {
        // моя реализация
        event.startDate = parseDate(event.startDate); // моя реализация
        event.endDate = parseDate(event.endDate); // моя реализация
        resultHTML += oneEventBlockTemplate(event);
      });
    }
    eventsList.innerHTML = resultHTML;
    const buttonsDownUp = Array.from(eventsList.querySelectorAll('button.smbs-event__arrow-down, button.smbs-event__arrow-up'));
    buttonsDownUp.forEach((button) => {
      button.addEventListener('click', () => {
        button.closest('.smbs-event-cube').classList.toggle('smbs-event-cube_show_top');
      });
      // if (button.classList.contains('smbs-event__arrow-down')) {
      //   (<HTMLElement>button.closest('.smbs-event-cube')).style.minHeight = window.getComputedStyle(
      //     button.closest('.smbs-event'),
      //   ).minHeight;
      //   button.closest('.smbs-event-cube').addEventListener('resize', (e: any) => {
      //     const { target } = e;
      //     target.style.minHeight = window.getComputedStyle(target.querySelector('smbs-event_front_side')).minHeight;
      //   });
      // }
    });
  }
}
