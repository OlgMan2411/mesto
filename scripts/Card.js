export default class {
  constructor(name, link, cardSelector, openPicviewPopup) {
    this._name = name;
    this._link = link;
    this._likeElemClass = ".elements__like";
    this._deleteElemClass = ".elements__delete";
    this._picViewElemClass = ".elements__foto";

    this._openPicviewPopup = openPicviewPopup;
    this._cardSelector = cardSelector;
  }

  // клонируем содержимое тега template
  _getTemplate() {
    const addCardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".elements__element")
      .cloneNode(true);

    return addCardElement;
  }

  _handleLikeClick() {
    this._element
      .querySelector(this._likeElemClass)
      .classList.toggle("elements__like_active");
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
      .querySelector(this._picViewElemClass)
      .addEventListener("click", () => {
        this._openPicviewPopup(this._link, this._name);
      });
  }

  renderElements() {
    this._element = this._getTemplate();

    this._setEventListeners();

    const openerPicView = this._element.querySelector(this._picViewElemClass);

    openerPicView.src = this._link;
    openerPicView.alt = this._name;
    this._element.querySelector(".elements__title").textContent = this._name;

    return this._element;
  }
}