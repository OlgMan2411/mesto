const editUserForm = document.forms.editUser
const addCardForm = document.forms.addCard

// Названия классов, необходимые для валидации
// validClasses = {
//     formSelector: '.form',
//     inputSelector: '.form__input',
//     submitButtonSelector: '.form__save',
//     activeButtonClass: 'form__save_active',
//     inputErrorClass: 'form__input_error'
//     // errorClass: 'popup__error_visible'
// };

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit')
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('button_inactive')
      } else {
        buttonElement.classList.remove('button_inactive')
      }
    };



const enableValidation = (formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass) => {
    con
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
        });
    
    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
      
    fieldsetList.forEach((formElement) => {
      setEventListeners(formElement);
    });    
  });

  }; 


  