export const renderEventsList = profileEvents => {
  const eventsList = document.getElementById('events-list');
  let resultHTML = '';
  if (!profileEvents.length) {
    const thereIsNothingGif = document.createElement('img');
    thereIsNothingGif.src = 'templates/one-event-block/img/thereIsNothing.gif';
    thereIsNothingGif.style.marginBottom = '5%';

    const nothingRow = document.createElement('div');
    nothingRow.className = 'profile-header';
    nothingRow.style.height = 'auto';
    nothingRow.style.alignItems = 'start';
    nothingRow.style.justifyContent = 'space-around';

    const someTextBefore = document.createElement('H6');
    someTextBefore.innerText = 'тут ничего нет';
    someTextBefore.style.fontSize = '24px';
    someTextBefore.style.marginTop = '40px';
    someTextBefore.style.textAlign = 'center';

    const someTextAfter = document.createElement('H6');
    someTextAfter.innerText = 'тут тоже';
    someTextAfter.style.fontSize = '24px';
    someTextAfter.style.marginTop = '40px';
    someTextAfter.style.textAlign = 'center';

    nothingRow.appendChild(someTextBefore);
    nothingRow.appendChild(thereIsNothingGif);
    nothingRow.appendChild(someTextAfter);

    const externalElement = document.createElement('div');
    externalElement.appendChild(nothingRow);

    resultHTML = externalElement.innerHTML;
  } else {
    profileEvents.forEach(event => {
      resultHTML += oneEventBlockTemplate(event);
    });
  }
  eventsList.innerHTML = resultHTML;
};

export const addDeclensionOfNumbers = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

export function buttonToggleHandler(e) {
  const {target} = e;
  if (target.classList.contains('tab-inactive')) {
    const curActiveElem = target.parentNode.querySelector('.tab-active');
    curActiveElem.classList.add('tab-inactive');
    target.classList.add('tab-active');
    target.classList.remove('tab-inactive');
    curActiveElem.classList.remove('tab-active');
    this.actions.changeTab(target.id);
  }

  if (target.classList.contains('button-inactive')) {
    const curActiveElem = target.parentNode.querySelector('.button-active');
    curActiveElem.classList.add('button-inactive');
    target.classList.add('button-active');
    target.classList.remove('button-inactive');
    curActiveElem.classList.remove('button-active');

    if (this.constructor.name === 'UserView') {
      this.actions.changeUserEventsButton(target.id);
    } else if (this.constructor.name === 'OneProfileView') {
      this.actions.changeOneProfileEventsButton(target.id);
    }
  }
}
