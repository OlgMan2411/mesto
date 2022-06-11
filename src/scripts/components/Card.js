import {
  likeSelector,
  likeActivateClass,
  likeCountSelector,
  deleteSelector,
  deleteVisibleClass,
  photoSelector,
  titleSelector,
  cardInContainerSelector,
} from "../utils/cardSelectorsClasses.js";

export default class {
  constructor({ data, userId, handleCardClick, handleLikeCount, handleSubmitDel }, cardTemplateSelector) {
    this._name = data.name;
    this._value = data.link;
    this._userId = userId;
    this.likeState = false;

    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._likeCount = this._likes.length;

    this._handleCardClick = handleCardClick;
    this._handleLikeCount = handleLikeCount;
    this._handleSubmitDel = handleSubmitDel
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
    this._value = data.value;
  }

  setLikesNum(num) {
    this._element.querySelector(likeCountSelector).textContent = num;
  }

  _handleLikeClick() {
    this._likeElem
      .classList.toggle(likeActivateClass);
    this.likeState = !this.likeState;

  }

  clearThisElement() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector(likeSelector).addEventListener("click", () => {
      this._handleLikeClick();
      this._handleLikeCount();
    });

    this._element
      .querySelector(deleteSelector)
      .addEventListener("click", () => {
        this._handleSubmitDel();
      });

    this._dataPicView.addEventListener("click", () => {
      this._handleCardClick(this._value, this._name);
    });
  }

  makeCard() {
    this._element = this._getTemplate();
    this._likeElem = this._element.querySelector(likeSelector);

    if (this._ownerId === this._userId) {
      this._element.querySelector(deleteSelector).classList.add(deleteVisibleClass)
    }

    this._dataPicView = this._element.querySelector(photoSelector);

    this._setEventListeners();

    this._element.id = this._cardId;
    this._dataPicView.src = this._value;
    this._dataPicView.alt = this._name;

    if (this._likes.some((likerObj => likerObj._id === this._ownerId))) {
      this._likeElem.classList.add(likeActivateClass);
      this.likeState = true;
    }

    this.setLikesNum(this._likeCount);
    this._element.querySelector(titleSelector).textContent = this._name;

    return this._element;
  }
}
