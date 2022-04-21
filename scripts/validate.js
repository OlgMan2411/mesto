const validClasses = {
  editUserId: 'editUser',
  addCardID: 'addCard',
  saveFormClass: '.form__save',
  activeSubmitButtonClass: 'form__save_active'
}; 

// Включить или выключить кнопку сохранить
const setSaveButtonState = (buttonElement, isValid, activeSubmitButtonClass) => {
  if (isValid) {
    buttonElement.classList.add(activeSubmitButtonClass);
  } else {
    buttonElement.classList.remove(activeSubmitButtonClass);
  }
};

const validateInput = (input) => {  
  const errorElement = input.parentNode.querySelector(`.${input.id}-error`);
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

const handleInput = (event, buttonElement, activeSubmitButtonClass) => {
  const currentForm = event.currentTarget;
  const input = event.target;  

  validateInput(input);
  setSaveButtonState(buttonElement, currentForm.checkValidity(), activeSubmitButtonClass)
  
};

const enableValidation = (valClasses) => {
  const UserForm = document.forms[valClasses.editUserId];
  const CardForm = document.forms[valClasses.addCardID];  

  // Для слушателя кнопки сохранения профиля
  const profileFormSaveBtn = UserForm.querySelector(valClasses.saveFormClass);

  // Для слушателя кнопки сохранения новой карты
  const newCardSaveBtn = CardForm.querySelector(valClasses.saveFormClass);

  UserForm.addEventListener('submit', (evt) => {
    // profileFormSubmitHandler();
    handleSubmit(evt, profileFormSubmitHandler);
  });
  CardForm.addEventListener('submit', (evt) => {    
    handleSubmit(evt, addCardFormSubmitHandler);    
  });

  UserForm.addEventListener('input', (evt) => {
    handleInput(evt, profileFormSaveBtn, valClasses.activeSubmitButtonClass);
  });
  CardForm.addEventListener('input', (evt) => {
    handleInput(evt, newCardSaveBtn, valClasses.activeSubmitButtonClass);
  });  
};

enableValidation(validClasses)