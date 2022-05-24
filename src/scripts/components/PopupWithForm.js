import Popup from "./Popup.js";
import {
  formNameInputSelector,
  formProffInputSelector,
} from "../utils/formSelectors.js";

export default class PopupWithForm extends Popup {
  constructor({ handlerSubmitForm }, popupSelector) {
    //name, link
    super(popupSelector);

    this._handlerSubmitForm = handlerSubmitForm;
  }

  _getInputValues() {
    const inputList = {};
    inputList["name"] = this._popup.querySelector(formNameInputSelector).value;
    inputList["profLink"] = this._popup.querySelector(
      formProffInputSelector
    ).value;
    return inputList;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this._getInputValues());
    });
  }
}
