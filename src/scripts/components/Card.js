import {
  likeSelector,
  likeActivateClass,
  deleteSelector,
  photoSelector,
  titleSelector,
  cardInContainerSelector,
} from "../utils/cardSelectorClasses.js";

export default class {
  constructor({ name, link, handleCardClick }, cardTemplateSelector) {
    this._name = name;
    this._link = link;
    this._likeElemClass = likeSelector;
    this._deleteElemClass = deleteSelector;
    this._picViewElemPhotoClass = photoSelector;
    this._picViewElemTitleClass = titleSelector;

    this._handleCardClick = handleCardClick;
    this._cardSelector = cardTemplateSelector;
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
    this._link = data.link;
  }

  getData() {
    return { name: this._name, proflink: this._link };
  }

  _handleLikeClick() {
    this._element
      .querySelector(this._likeElemClass)
      .classList.toggle(likeActivateClass);
  }

  _clearThisElement() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(this._likeElemClass)
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(this._deleteElemClass)
      .addEventListener("click", () => {
        this._clearThisElement();
      });

    this._element
      .querySelector(this._picViewElemPhotoClass)
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._name);
      });
  }

  renderElements() {
    this._element = this._getTemplate();

    this._setEventListeners();

    const dataPicView = this._element.querySelector(
      this._picViewElemPhotoClass
    );

    dataPicView.src = this._link;
    dataPicView.alt = this._name;
    this._element.querySelector(this._picViewElemTitleClass).textContent =
      this._name;

    return this._element;
  }
}
