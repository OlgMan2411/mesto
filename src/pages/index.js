import '../pages/index.css';

// Переменные
import initialCards from "../scripts/utils/cardsData.js";
import validClasses from "../scripts/utils/validClassesSelectors.js";
import { cardTemplateSelector, containerSelector } from "../scripts/utils/cardSelectorClasses.js";
import { popupEditProfileSelector, popupAddCardSelector, popupPicviewSelector, popupWithFormCloserSelector, popupWithPicveiwCloserSelector } from "../scripts/utils/popupSelectorsClasses.js";
import { formSelector, formNameInputSelector, formProffInputSelector } from "../scripts/utils/formSelectors.js";
import { profileNameSelector, profileProffSelector, openProfileEditBtnSelector, openProfileAddCardBtnSelector } from "../scripts/utils/profileSelectors.js";

// Попапы
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";

// Прочие компоненты
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js"; // место наполнения карточками
import Card from "../scripts/components/Card.js";
import UserInfo from "../scripts/components/UserInfo.js"; // информация для профиля 

const profilInfo = new UserInfo({
  name: profileNameSelector, 
  profLink: profileProffSelector, 
});

// Открывашки
const openerProfileButton = document.querySelector(openProfileEditBtnSelector);
const openerAddCardButton = document.querySelector(openProfileAddCardBtnSelector);

// Попапы
//  редактирования профиля
const profilEditPop = document.querySelector(popupEditProfileSelector);

// открытия новой карточки с фото
const newCardPopup = document.querySelector(popupAddCardSelector);

// открытия просмотра фото
const picviewPopup = document.querySelector(popupPicviewSelector);

// Закрывашки
const closerProfileEdit = profilEditPop.querySelector(
  `${popupEditProfileSelector} ${popupWithFormCloserSelector}`
);

const closerAddPhoto = newCardPopup.querySelector(
   `${popupAddCardSelector} ${popupWithFormCloserSelector}`
   );
const closerViewPhoto = picviewPopup.querySelector(popupWithPicveiwCloserSelector);

const formValidators = {};
// Включение валидации
const enableValidation = (valClasses) => {
  const formList = Array.from(
    document.querySelectorAll(valClasses.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(valClasses, formElement);

    formValidators[formElement.name] = validator;

    validator.enableValidation();
  });
};

enableValidation(validClasses);

// Поля ввода профиля пользователя
const profNameInput = profilEditPop.querySelector(
  `${popupEditProfileSelector} ${formNameInputSelector}` 
);
const profJobInput = profilEditPop.querySelector(
  `${popupEditProfileSelector} ${formProffInputSelector}` 
);

// Попапы всех видов и сразу слушатели
const popupWithImage = new PopupWithImage(popupPicviewSelector);
popupWithImage.setEventListeners();

const popupAddCard = new PopupWithForm(
  {
    handlerSubmitForm: (data) => {
      cardsList.addItem(createCard(data.name, data.profLink));
      newCardPopup.querySelector(formSelector).reset();
      popupAddCard.close();
    },
  },
  popupAddCardSelector
);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(
  {
    handlerSubmitForm: (data) => {
      profilInfo.setUserInfo(data.name, data.profLink);
      popupEditProfile.close();
    },
  },
  popupEditProfileSelector
);
popupEditProfile.setEventListeners();

const createCard = (data) => {
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      handleCardClick: () => popupWithImage.open(data.name, data.link),
    },
    
    cardTemplateSelector
  );
  return card.renderElements();
};

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    },
  },
  containerSelector
);

cardsList.renderItems(initialCards);

// Слушаем, открываем
openerAddCardButton.addEventListener("click", () => {
  formValidators["addCard"].deactivateSaveButton();
  popupAddCard.open();
});

openerProfileButton.addEventListener("click", () => {
  popupEditProfile.open();
  profNameInput.value = profilInfo.getUserInfo().name; //profileName.textContent;
  profJobInput.value = profilInfo.getUserInfo().profLink; //profileProfession.textContent;
});

// Слушаем, закрываем
closerViewPhoto.addEventListener("click", () => {
  popupWithImage.close();
});

closerProfileEdit.addEventListener("click", () => {
  popupEditProfile.close();
});

closerAddPhoto.addEventListener("click", () => {
  popupAddCard.close();
});
