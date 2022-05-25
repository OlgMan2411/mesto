import Popup from "./Popup.js";
import { formAnyInputSelector } from "../utils/formSelectors.js";

export default class PopupWithForm extends Popup {
  constructor({ handlerSubmitForm }, popupSelector) {
    //name, link
    super(popupSelector);

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

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this._getInputValues());
    });
  }
}
