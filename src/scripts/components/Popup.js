import {
  popupOpenerClass,
  popupWithFormCloserSelector,


} from "../utils/popupSelectorsClasses.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._openerClass = popupOpenerClass;

    this._popup = document.querySelector(this._popupSelector);
    this._closerElem = this._popup.querySelector(popupWithFormCloserSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOutClick = this._handleOutClick.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this._popup.classList.add(this._openerClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._openerClass);
    document.removeEventListener("keydown", this._handleEscClose);
    // this._popup.removeEventListener("click", this._handleOutClick);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOutClick(evt) {
    if (
      evt.target.classList.contains(this._openerClass) ||
      evt.target.classList.contains(this._closerSelector)
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", this._handleOutClick);
    this._closerElem.addEventListener("click", this.close);
  }
}
