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
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.remove(this._activeSubmitButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.add(this._activeSubmitButtonClass);
    }
  }

  _showInputError (inputElement) {
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
    // console.log(`Получили список полей ввода: ${inputList}`)
  
    this._toggleButtonState();
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
      this._formElement.addEventListener("submit", (evt) => {
          evt.preventDefault();
        });
      this._setEventListeners();
    };
  };



// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// Включить или выключить кнопку сохранить
// function toggleButtonState(inputList, buttonElement, activeSubmitButtonClass) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.setAttribute("disabled", true);
//     buttonElement.classList.remove(activeSubmitButtonClass);
//   } else {
//     buttonElement.removeAttribute("disabled");
//     buttonElement.classList.add(activeSubmitButtonClass);
//   }
// }

// const showInputError = (
//   formElement,
//   inputElement,
//   errorMessage,
//   valClasses
// ) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(valClasses.inputErrorClass);
//   errorElement.textContent = errorMessage;
// };

// const hideInputError = (formElement, inputElement, valClasses) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(valClasses.inputErrorClass);
//   errorElement.textContent = "";
// };

// const checkInputValidity = (formElement, inputElement, valClasses) => {
//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       valClasses
//     );
//   } else {
//     hideInputError(formElement, inputElement, valClasses);
//   }
// };

// const setEventListeners = (formElement, valClasses) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(valClasses.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(
//     valClasses.submitButtonSelector
//   );

//   toggleButtonState(
//     inputList,
//     buttonElement,
//     valClasses.activeSubmitButtonClass
//   );

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(formElement, inputElement, valClasses);
//       toggleButtonState(
//         inputList,
//         buttonElement,
//         valClasses.activeSubmitButtonClass
//       );
//     });
//   });
// };

// const enableValidation = (valClasses) => {
//   const formList = Array.from(
//     document.querySelectorAll(valClasses.formSelector)
//   );

//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", function (evt) {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, valClasses);
//   });
// };

// enableValidation(validClasses);
