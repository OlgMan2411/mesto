import Popup from "./Popup.js";
import { formAnyInputSelector, formSaveBtnSelector } from "../utils/formSelectors.js";

export default class PopupWithForm extends Popup {
  constructor({ handlerSubmitForm }, popupSelector) {
    //name, link
    super(popupSelector);
    this._saveBtnElem = this._popup.querySelector(formSaveBtnSelector);
    this._saveBtnText = this._saveBtnElem.textContent;
    this._handlerSubmitForm = handlerSubmitForm;
  }

  _getInputValues() {
    const inputList = Array.from(
      this._popup.querySelectorAll(formAnyInputSelector)
    );
    const inputValues = {};
    inputList.forEach(({ name, value }) => {
      inputValues[name] = value;
    });

    return inputValues;
  }

  renderLoading = (boolean) => {
    if (boolean) {
      this._saveBtnElem.textContent = 'Сохранение...'
    } else {
      this._saveBtnElem.textContent = this._saveBtnText
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this._getInputValues());
    });
  }
}
