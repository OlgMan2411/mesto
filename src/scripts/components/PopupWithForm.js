import Popup from "./Popup.js";
import { formSelector, formAnyInputSelector, formSaveBtnSelector } from "../utils/formSelectors.js";

export default class PopupWithForm extends Popup {
  constructor({ handlerSubmitForm }, popupSelector) {
    super(popupSelector);
    this._saveBtnElem = this._popup.querySelector(formSaveBtnSelector);
    this._saveBtnText = this._saveBtnElem.textContent;
    this._handlerSubmitForm = handlerSubmitForm;
    this._inputList = Array.from(
      this._popup.querySelectorAll(formAnyInputSelector)
    );
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(({ name, value }) => {
      inputValues[name] = value;
    });

    return inputValues;
  }

  close() {
    super.close();
    this._popup.querySelector(formSelector).reset();

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
