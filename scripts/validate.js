const validClasses = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save",
  activeSubmitButtonClass: "form__save_active",
  inputErrorClass: "form__input_type-error",
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Включить или выключить кнопку сохранить
function toggleButtonState(inputList, buttonElement, activeSubmitButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.remove(activeSubmitButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.add(activeSubmitButtonClass);
  }
}

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  valClasses
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(valClasses.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, valClasses) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(valClasses.inputErrorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, valClasses) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      valClasses
    );
  } else {
    hideInputError(formElement, inputElement, valClasses);
  }
};

const setEventListeners = (formElement, valClasses) => {
  const inputList = Array.from(
    formElement.querySelectorAll(valClasses.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    valClasses.submitButtonSelector
  );

  toggleButtonState(
    inputList,
    buttonElement,
    valClasses.activeSubmitButtonClass
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, valClasses);
      toggleButtonState(
        inputList,
        buttonElement,
        valClasses.activeSubmitButtonClass
      );
    });
  });
};

const enableValidation = (valClasses) => {
  const formList = Array.from(
    document.querySelectorAll(valClasses.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, valClasses);
  });
};

enableValidation(validClasses);
