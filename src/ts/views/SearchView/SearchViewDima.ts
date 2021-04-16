import { ChannelNames } from "../../config/config";
import {
  addDeclensionOfNumbers,
  buttonToggleHandler,
  searchPaginatorHandler,
  updatePaginationState,
} from "../utils/utils";
import ProfilesBaseView from "../ProfilesBaseView/ProfilesBaseView";
import Actions from "../../actions/actions";

const oneUserBlockTemplate = require("../../../templates/one-user-block/one-user-block.pug");
const searchTemplate = require("../../../templates/search/search.pug");
const searchEventsTabTemplate = require("../../../templates/search-events-tab/search-events-tab.pug");
const paginationBlockTemplate = require("../../../templates/pagination-block/pagination-block.pug");
const searchUsersTabTemplate = require("../../../templates/search-users-tab/search-users-tab.pug");

export default class SearchViewDima extends ProfilesBaseView {
  public globalStore: any;

  public actions: Actions;

  constructor(globalStore: any, actions: Actions) {
    super();
    this.globalStore = globalStore;
    this.actions = actions;
  }

  renderEventsList(events: any) {
    super.renderEventsList(events);

    const { currentEventsPage } = this.globalStore.searchStore;
    const { searchResultEvents } = this.globalStore.searchStore;
    updatePaginationState(currentEventsPage, searchResultEvents.length);
  }

  renderSearchPage() {
    window.scroll(0, 0);
    const { searchData } = this.globalStore.searchStore;

    const wrapper = document.getElementById("wrapper");
    wrapper.style.background =
      'url("templates/profile/img/profile-background.jpg") no-repeat top / 100%';

    wrapper.innerHTML = "";
    wrapper.innerHTML = searchTemplate();

    (document.getElementById(
      "searchInput"
    ) as HTMLInputElement).value = searchData;

    document
      .getElementById("searchInput")
      .addEventListener("change", this.handleSearch.bind(this));
    document
      .getElementById("jsSearchRequest")
      .addEventListener("click", this.handleSearch.bind(this));

    const tabsBlock = document.getElementById("jsTabsBlock");
    const tabs = Array.from(
      tabsBlock.querySelectorAll('button[data-buttontype="toggle"]')
    );
    tabs.forEach((tab) => {
      tab.addEventListener("click", buttonToggleHandler.bind(this));
    });

    document.getElementById(this.globalStore.searchStore.currentTab).click();

    this.renderChangingContent();
  }

  handleSearch() {
    const inputVal = (document.getElementById(
      "searchInput"
    ) as HTMLInputElement).value;
    const { currentUrl } = this.globalStore.routerStore;

    window.history.pushState(
      { page: currentUrl.pathname, parameter: inputVal },
      "",
      `${currentUrl.pathname}?tab=${inputVal}`
    );

    this.actions.newSearchInputData(inputVal);
  }

  renderChangingContent() {
    const { currentTab } = this.globalStore.searchStore;
    const { searchResultEvents } = this.globalStore.searchStore;
    const { searchResultUsers } = this.globalStore.searchStore;
    const { currentEventsPage } = this.globalStore.searchStore;
    const { currentUsersPage } = this.globalStore.searchStore;
    const changingContent = document.getElementById("changing-content");
    switch (currentTab) {
      case "eventsTab":
        changingContent.innerHTML = searchEventsTabTemplate();
        this.renderSearchEventsTab();

        const eventsPaginator = document.getElementById("paginator");
        eventsPaginator.innerHTML = paginationBlockTemplate();
        updatePaginationState(currentEventsPage, searchResultEvents.length);
        break;

      case "usersTab":
        changingContent.innerHTML = searchUsersTabTemplate();
        this.renderUsersList(searchResultUsers);
        const usersPaginator = document.getElementById("paginator");
        usersPaginator.innerHTML = paginationBlockTemplate();
        updatePaginationState(currentUsersPage, searchResultUsers.length);
        break;

      default:
        break;
    }
    document
      .getElementById("paginationBack")
      .addEventListener("click", searchPaginatorHandler.bind(this));
    document
      .getElementById("paginationForward")
      .addEventListener("click", searchPaginatorHandler.bind(this));
  }

  renderSearchEventsTab() {
    const { currentEventsButton } = this.globalStore.searchStore;
    const { searchResultEvents } = this.globalStore.searchStore;

    const changingContent = document.getElementById("changing-content");

    const buttons = Array.from(
      changingContent.querySelectorAll('button[data-buttontype="toggle"]')
    );
    buttons.forEach((button) => {
      button.addEventListener("click", buttonToggleHandler.bind(this));
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
    this.renderEventsList(searchResultEvents);
  }

  renderUsersList(users: any) {
    window.scroll(0, 0);
    const usersList = document.getElementById("users-list");
    let resultHTML = "";
    if (!users.length || (users.length === 1 && users[0] === "Not Found")) {
      const nothingRow = document.createElement("div");
      nothingRow.className = "profile-header";
      nothingRow.style.height = "auto";
      nothingRow.style.alignItems = "start";
      nothingRow.style.justifyContent = "center";

      const thereIsNothing = document.createElement("H6");
      thereIsNothing.innerText = "Никого не найдено =(";
      thereIsNothing.style.fontSize = "24px";
      thereIsNothing.style.textAlign = "center";
      thereIsNothing.style.marginBottom = "30px";

      nothingRow.appendChild(thereIsNothing);

      const externalElement = document.createElement("div");
      externalElement.appendChild(nothingRow);

      resultHTML = externalElement.innerHTML;
    } else {
      users.forEach((user: any) => {
        if (user !== "Not Found") {
          user.age = addDeclensionOfNumbers(user.age, ["год", "года", "лет"]);
          user.followers = addDeclensionOfNumbers(user.followers, [
            "подписчик",
            "подписчика",
            "подписчиков",
          ]);
          // пока бэк не отдает город, возраст и подписчиков для юзеров в поиске, заглушки:
          if (!user.city) {
            user.city = "Москва";
          }
          if (!user.age) {
            user.age = "19 лет";
          }
          if (!user.followers) {
            user.followers = "12 подписчиков";
          }
          resultHTML += oneUserBlockTemplate(user);
        }
      });
    }
    usersList.innerHTML = resultHTML;
    const { currentUsersPage } = this.globalStore.searchStore;
    const { searchResultUsers } = this.globalStore.searchStore;
    updatePaginationState(currentUsersPage, searchResultUsers.length);
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(
      ChannelNames.searchUpdated,
      this.renderSearchPage.bind(this)
    );

    this.globalStore.eventBus.subscribe(
      ChannelNames.searchEventsButtonChanged,
      this.renderEventsList.bind(this)
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.searchEventsPageChanged,
      this.renderEventsList.bind(this)
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.searchUsersPageChanged,
      this.renderUsersList.bind(this)
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.searchTabChanged,
      this.renderChangingContent.bind(this)
    );
  }
}
