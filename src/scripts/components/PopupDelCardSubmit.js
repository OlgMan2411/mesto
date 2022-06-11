import Popup from "./Popup.js";
import { formSaveBtnSelector } from "../utils/formSelectors.js";

export default class PopupDelCardSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._saveBtnElem = this._popup.querySelector(formSaveBtnSelector);
    this._saveBtnText = this._saveBtnElem.textContent;
  }


  close() {
    super.close();
  }

  renderLoading = (boolean) => {
    if (boolean) {
      this._saveBtnElem.textContent = 'Сохранение...'
    } else {
      this._saveBtnElem.textContent = this._saveBtnText
    }
  }

  handlerSubmitAct(act) {
    this._handleSubmitDel = act;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitDel();
    });
  }
}
