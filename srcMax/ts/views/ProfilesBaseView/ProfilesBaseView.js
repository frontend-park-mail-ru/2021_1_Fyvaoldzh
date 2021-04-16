
import { parseDate, updatePaginationState } from "../utils/utils.js";
import { profileEventsButton } from "../../config/config";

export default class ProfilesBaseView {
  constructor() {}

  renderEventsList(events) {
    window.scroll(0, 0);
    const eventsList = document.getElementById("events-list");
    let resultHTML = "";
    if (!events.length) {
      const nothingRow = document.createElement("div");
      nothingRow.className = "profile-header";
      nothingRow.style.height = "auto";
      nothingRow.style.alignItems = "start";
      nothingRow.style.justifyContent = "center";

      const thereIsNothing = document.createElement("H6");
      thereIsNothing.innerText = `Ничего не найдено =(`;
      thereIsNothing.style.fontSize = "24px";
      thereIsNothing.style.textAlign = "center";
      thereIsNothing.style.marginBottom = "30px";

      nothingRow.appendChild(thereIsNothing);

      const externalElement = document.createElement("div");
      externalElement.appendChild(nothingRow);

      resultHTML = externalElement.innerHTML;
    } else {
      events.forEach((event) => {
        event.startDate = parseDate(event.startDate);
        event.endDate = parseDate(event.endDate);
        resultHTML += oneEventBlockTemplate(event);
      });
    }
    eventsList.innerHTML = resultHTML;
  }
}
