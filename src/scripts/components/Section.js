import {
  formNameInputSelector,
  formValueInputSelector,
} from "../utils/formSelectors.js";

export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    this._name = this._container.querySelector(formNameInputSelector);
    this._proflink = this._container.querySelector(formValueInputSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(cards) {
    cards.forEach(this._renderer);
  }
}
