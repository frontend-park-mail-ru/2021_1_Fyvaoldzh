/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import {pageNames, channelNames, urlMap, SERVER_ERRORS} from '../../config/config.js';
import INPUTS from '../../validationModule/validation.js';

const globalStoreSymbol = Symbol('globalStoreSymbol');
const actionsSymbol = Symbol('actionsSymbol');

export default class OneProfileView {
  constructor({globalStore, actions}) {
    this[globalStoreSymbol] = globalStore;
    this[actionsSymbol] = actions;
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  get actions() {
    return this[actionsSymbol];
  }

  renderOneProfilePage() {
    if (this.globalStore.currentPage !== pageNames.oneProfilePage) {
      return;
    }

    window.scroll(0, 0);
    const {oneProfileData} = this.globalStore.oneProfileStore;

    const wrapper = document.getElementById('wrapper');
    wrapper.style.background = 'url("components/img/profile-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    // let profileDataJson = await getProfileById();

    oneProfileData.age += this.addDeclensionOfNumbers(oneProfileData.age, [' год', ' года', ' лет']);
    oneProfileData.followers += this.addDeclensionOfNumbers(oneProfileData.followers, [
      ' подписчик',
      ' подписчика',
      ' подписчиков',
    ]);

    wrapper.innerHTML = oneProfileTemplate(oneProfileData);
    wrapper.querySelector('.profile-main-block').insertAdjacentHTML('beforeend', profileEventsTabTemplate());

    let ava = document.getElementById('profileAvatar');
    ava.style.background = `url(${imgUrl + oneProfileData.Uid}) no-repeat center / cover`;

    let buttons = Array.from(document.getElementsByTagName('button'));
    buttons.forEach(element => {
      if (element.dataset.buttontype === 'toggle') {
        let buttonToggleHandlerObject = {
          oneProfileDataJson: oneProfileData,
        };
        buttonToggleHandlerObject.handlerFunc = buttonToggleHandler;

        element.addEventListener('click', buttonToggleHandlerObject.handlerFunc.bind(buttonToggleHandlerObject));
      }
    });
    if (document.getElementById('planningEventsButton').classList.contains('button-active')) {
      this.renderEventsList(oneProfileData.events);
    } else if (document.getElementById('visitedEventsButton').classList.contains('button-active')) {
      this.renderEventsList(null);
    }
  }

  renderEventsList(events) {
    const eventsList = document.getElementById('events-list');
    let resultHTML = '';
    if (events === null) {
      const thereIsNothingGif = document.createElement('img');
      thereIsNothingGif.src = 'components/img/thereIsNothing.gif';
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
      for (let curEventId in events) {
        // const eventJson = getEventById(events[curEventId]);
        // this.actions.eventPage(curEventId);
        const {oneEventData} = this.globalStore.oneProfileStore;
        resultHTML += oneEventBlockTemplate(eventJson);
      }
    }
    eventsList.innerHTML = resultHTML;
  }

  addDeclensionOfNumbers(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
  }

  buttonToggleHandler(e) {
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
    }
  }

  subscribeViews() {}
}
