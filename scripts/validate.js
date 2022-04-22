const validClasses = {
  // formNames: ['editUser', 'addCard'],
  inputClasses: ['.form__input_name', '.form__input_profession'],
  saveFormClass: '.form__save',
  activeSubmitButtonClass: 'form__save_active'
}; 

// Включить или выключить кнопку сохранить
const setSaveButtonState = (buttonElement, isValid, activeSubmitButtonClass) => {
  if (isValid) {
    buttonElement.classList.add(activeSubmitButtonClass);
    buttonElement.removeAttribute('disabled');
  } else {
    buttonElement.classList.remove(activeSubmitButtonClass);
    buttonElement.setAttribute('disabled', '');
  }
};

const validateInput = (input) => {  
  const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  errorElement.textContent = input.validationMessage;  
};

const handleSubmit = (event, handler) => {
  event.preventDefault();  
  const currentForm = event.target;

  if (currentForm.checkValidity()) {
    handler();
    currentForm.reset();
  }
};

const handleInput = (event, buttonElement, inputList, activeSubmitButtonClass) => {
  const currentForm = event.currentTarget;
  

  inputList.forEach((inputClass) => {
    const inputElement = currentForm.querySelector(inputClass);
    validateInput(inputElement);
  });

  setSaveButtonState(buttonElement, currentForm.checkValidity(), activeSubmitButtonClass)
  
};

const enableValidation = (valClasses) => {
  const formList = Array.from(document.forms);
  
  formList.forEach((formElement) => {
    const formSaveBtn = formElement.querySelector(valClasses.saveFormClass);
    
    if (formElement.name === 'editUser') {
      formElement.addEventListener('submit', (evt) => {
        handleSubmit(evt, profileFormSubmitHandler);
      });
    }

    if (formElement.name === 'addCard') {
      formElement.addEventListener('submit', (evt) => {
        handleSubmit(evt, addCardFormSubmitHandler);
      });
    }

    formElement.addEventListener('input', (evt) => {
      handleInput(evt, formSaveBtn, valClasses.inputClasses, valClasses.activeSubmitButtonClass);
    });
  });
};

enableValidation(validClasses);