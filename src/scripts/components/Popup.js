export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closerSelector = ".popup__closed";
    this._openerClass = "popup_opened";

    this._popup = document.querySelector(this._popupSelector);
  }

  open() {
    this._popup.classList.add(this._openerClass);
    document.addEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
  }

  close() {
    this._popup.classList.remove(this._openerClass);
    this._popup
      .querySelector(this._closerSelector)
      .removeEventListener("click", this.close);
    document.removeEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
    this._popup.removeEventListener("click", (event) => {
      this._handleOutClick(event);
    });
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOutClick(evt) {
    const clickedElem = evt.target;
    if (clickedElem.classList.contains(this._openerClass)) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      this._handleOutClick(event);
    });
    this._popup
      .querySelector(this._closerSelector)
      .addEventListener("click", this.close);
  }
}
