import { profileEventsButton, ChannelNames, urlMap } from "../../config/config";
import Store from "../../storage/store";
import Actions from "../../actions/actions";

const oneProfileTemplate = require("Templates/one-profile/one-profile.pug");
const profileEventsTabTemplate = require("Templates/profile-events-tab/profile-events-tab.pug");
const paginationBlockTemplate = require("Templates/pagination-block/pagination-block.pug");
// const oneEventBlockTemplate = require("Templates/one-event-block/one-event-block.pug");

import {
  addDeclensionOfNumbers,
  buttonToggleHandler,
  oneProfilePaginatorHandler,
  updatePaginationState,
} from "../utils/utils.js";

import ProfilesBaseView from "../ProfilesBaseView/ProfilesBaseView";

export default class OneProfileView extends ProfilesBaseView {
  public globalStore: Store;

  public actions: Actions;

  public wrapper: HTMLElement;

  constructor(globalStore: Store, actions: Actions) {
    super();
    this.globalStore = globalStore;
    this.actions = actions;
    this.wrapper = document.getElementById("wrapper");
  }

  renderEventsList(events: Array<Object>) {
    super.renderEventsList(events);

    //вне зависимости от нажатой кнопки планируемых/посещенных ивентов текущая страница выбранного раздела хранится в currentEventsPage
    const {
      currentEventsPage,
      currentEventsButton,
    } = this.globalStore.oneProfileStore;

    //обновляем состояние пагинатора после отрисовки списка
    switch (currentEventsButton) {
      case profileEventsButton.planning:
        const { oneProfilePlanningEvents } = this.globalStore.oneProfileStore;
        updatePaginationState(
          currentEventsPage,
          oneProfilePlanningEvents.length
        );
        break;
      case profileEventsButton.visited:
        const { oneProfileVisitedEvents } = this.globalStore.oneProfileStore;
        updatePaginationState(
          currentEventsPage,
          oneProfileVisitedEvents.length
        );
        break;
    }

    //обновляем силь кнопок в зависимости от активной кнопки в сторе:
    const eventsButtonsBlock = document.getElementById("jsEventsButtonsBlock");
    let buttons = Array.from(
      eventsButtonsBlock.querySelectorAll('button[data-buttontype="toggle"]')
    );
    buttons.forEach((button) => {
      switch (button.id) {
        case currentEventsButton:
          button.classList.add("button-active");
          button.classList.remove("button-inactive");
          break;

        default:
          button.classList.add("button-inactive");
          button.classList.remove("button-active");
          break;
      }
    });
  }

  renderOneProfilePage() {
    window.scroll(0, 0);
    const { oneProfileData } = this.globalStore.oneProfileStore;
    const { currentEventsButton } = this.globalStore.oneProfileStore;
    const { oneProfilePlanningEvents } = this.globalStore.oneProfileStore;
    const { oneProfileVisitedEvents } = this.globalStore.oneProfileStore;

    this.wrapper.style.background =
      'url("templates/one-profile/img/one-profile-background.jpg") no-repeat top / 100%';

    oneProfileData.age = addDeclensionOfNumbers(oneProfileData.age, [
      "год",
      "года",
      "лет",
    ]);
    oneProfileData.followersCount = addDeclensionOfNumbers(
      oneProfileData.followers.length,
      ["подписчик", "подписчика", "подписчиков"]
    );

    this.wrapper.innerHTML = "";
    this.wrapper.innerHTML = oneProfileTemplate(oneProfileData);
    this.wrapper
      .querySelector(".profile-main-block")
      .insertAdjacentHTML("beforeend", profileEventsTabTemplate());

    const { currentEventsPage } = this.globalStore.oneProfileStore;

    let ava = document.getElementById("profileAvatar");
    ava.style.background = `url(${
      urlMap.imgUrl + oneProfileData.Uid
    }) no-repeat center / cover`;

    const eventsButtonsBlock = document.getElementById("jsEventsButtonsBlock");
    let buttons = Array.from(
      eventsButtonsBlock.querySelectorAll('button[data-buttontype="toggle"]')
    );
    buttons.forEach((button) => {
      button.addEventListener("click", buttonToggleHandler.bind(this));
    });

    switch (currentEventsButton) {
      case profileEventsButton.planning:
        this.renderEventsList(oneProfilePlanningEvents);
        break;

      case profileEventsButton.visited:
        this.renderEventsList(oneProfileVisitedEvents);
        break;

      default:
        break;
    }

    //ренедерим пагинатор:
    const oneProfilePaginator = document.getElementById("paginator");
    oneProfilePaginator.innerHTML = paginationBlockTemplate();

    switch (currentEventsButton) {
      case profileEventsButton.planning:
        // updatePaginationState(currentEventsPage, oneProfilePlanningEvents.length);  //использовать, когда на бэке будет пагинация,
        // а пока что в качестве количества результатов закидываем 1 (<6), чтобы скрыть кнопку "вперед"
        updatePaginationState(currentEventsPage, 1);
        break;
      case profileEventsButton.visited:
        // updatePaginationState(currentEventsPage, oneProfileVisitedEvents.length);  //то же самое для посещенных мероприятий
        updatePaginationState(currentEventsPage, 1);
        break;
    }

    document
      .getElementById("paginationBack")
      .addEventListener("click", oneProfilePaginatorHandler.bind(this));
    document
      .getElementById("paginationForward")
      .addEventListener("click", oneProfilePaginatorHandler.bind(this));
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(
      ChannelNames.oneProfileUpdated,
      this.renderOneProfilePage.bind(this)
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.oneProfilePageChanged,
      this.renderEventsList.bind(this)
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.oneProfileEventsButtonChanged,
      this.renderEventsList.bind(this)
    );
  }
}
