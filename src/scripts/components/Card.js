import {
  likeSelector,
  likeActivateClass,
  deleteSelector,
  photoSelector,
  titleSelector,
  cardInContainerSelector,
} from "../utils/cardSelectorsClasses.js";

export default class {
  constructor({ name, value, handleCardClick }, cardTemplateSelector) {
    this._name = name;
    this._value = value;

    this._handleCardClick = handleCardClick;
    this._cardSelector = cardTemplateSelector;
    this._dataPicView = this._element.querySelector(photoSelector);
  }

  // клонируем содержимое тега template
  _getTemplate() {
    const addCardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(cardInContainerSelector)
      .cloneNode(true);

    return addCardElement;
  }

  setData(data) {
    this._name = data.name;
    this._value = data.value;
  }

  _handleLikeClick() {
    this._element
      .querySelector(likeSelector)
      .classList.toggle(likeActivateClass);
  }

  _clearThisElement() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector(likeSelector).addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._element
      .querySelector(deleteSelector)
      .addEventListener("click", () => {
        this._clearThisElement();
      });

    this._element.querySelector(photoSelector).addEventListener("click", () => {
      this._handleCardClick(this._value, this._name);
    });
  }

  makeCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    const dataPicView = this._element.querySelector(photoSelector);

    dataPicView.src = this._value;
    dataPicView.alt = this._name;
    this._element.querySelector(titleSelector).textContent = this._name;

    return this._element;
  }
}
