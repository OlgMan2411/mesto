export default class {
  constructor(valClasses, formElement) {
    this._formElement = formElement;
    this._formSelector = valClasses.formSelector;
    this._inputSelector = valClasses.inputSelector;
    this._submitButtonSelector = valClasses.submitButtonSelector;
    this._activeSubmitButtonClass = valClasses.activeSubmitButtonClass;
    this._inputErrorClass = valClasses.inputErrorClass;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.deactivateSaveButton();
    } else {
      this.activateSaveButton();
    }
  }

  activateSaveButton() {
    this._buttonElement.removeAttribute("disabled");
    this._buttonElement.classList.add(this._activeSubmitButtonClass);
  }

  deactivateSaveButton() {
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.remove(this._activeSubmitButtonClass);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._toggleButtonState();

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState();
      });
    });
  };

  resetErrors() {
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  };
};