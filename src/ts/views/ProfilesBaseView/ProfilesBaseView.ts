const oneEventBlockTemplate = require('../../../templates/one-event-block/one-event-block.pug');

export default class ProfilesBaseView {
  constructor() {}

  public renderEventsList(events: any) {
    const eventsList = document.getElementById('events-list');
    let resultHTML = '';
    if (!events.length) {
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

      nothingRow.appendChild(thereIsNothing);

      const externalElement = document.createElement('div');
      externalElement.appendChild(nothingRow);

      resultHTML = externalElement.innerHTML;
    } else {
      events.forEach((event: any) => {
        resultHTML += oneEventBlockTemplate(event);
      });
    }
    eventsList.innerHTML = resultHTML;
  }
}
