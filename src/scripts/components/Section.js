export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    this._name = this._container.querySelector(".form__input_name");
    this._proflink = this._container.querySelector(".form__input_profession");
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(cards) {
    cards.forEach((card) => this._renderer(card));
  }
}
