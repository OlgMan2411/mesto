import Popup from "./Popup.js";
import {
  photoInputSelector,
  titleInputSelector,
} from "../utils/popupSelectorsClasses.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._photoElem = this._popup.querySelector(photoInputSelector);
    this._titleElem = this._popup.querySelector(titleInputSelector);
  }

  open(name, link) {
    super.open();
    this._photoElem.src = link;
    this._photoElem.alt = name;
    this._titleElem.textContent = name;
  }
}
