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
}
