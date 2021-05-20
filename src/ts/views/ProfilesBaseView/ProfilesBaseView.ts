import {modalOverlayHandler, shareButtonHandler, copyButtonHandler, parseDate} from '../utils/utils';

// (window as any).VK = require('https://vk.com/js/api/share.js?93');

// const asfasdv = require('../../VK.js');
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
    });

    // const eventCubes = Array.from(eventsList.querySelectorAll('.smbs-event-cube'));
    // eventCubes.forEach((eventCube) => {
    //   const photo : HTMLAnchorElement = eventCube.querySelector('.smbs-event__photo');
    //   const title : HTMLAnchorElement = eventCube.querySelector('.smbs-event__title');
    //   eventCube.querySelector('.smbs-event__button-block').innerHTML = (window as any).VK.Share.button({url: title.href, title: title.innerText, image: photo.style.backgroundImage.slice(5, -2)}, {type: 'round'});
    // });

    const modalOverlay = document.querySelector('#modal-overlay');
    modalOverlay.addEventListener('click', modalOverlayHandler.bind(this));

    const copyButton = document.querySelector('#copyButton');
    copyButton.addEventListener('click', copyButtonHandler.bind(this));

    const shareButtons = Array.from(eventsList.querySelectorAll('.smbs-event__share-button'));
    shareButtons.forEach((shareButton) => {
      shareButton.addEventListener('click', shareButtonHandler.bind(this));
    });

  }
}
