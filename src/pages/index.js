import "../pages/index.css";

// Переменные
import initialCards from "../scripts/utils/cardsData.js";
import validClasses from "../scripts/utils/validClassesSelectors.js";
import {
  cardTemplateSelector,
  containerSelector,
} from "../scripts/utils/cardSelectorsClasses.js";
import {
  popupEditProfileSelector,
  popupAddCardSelector,
  popupPicviewSelector,
  popupWithFormCloserSelector,
  popupWithPicveiwCloserSelector,
} from "../scripts/utils/popupSelectorsClasses.js";
import {
  formSelector,
  formNameInputSelector,
  formValueInputSelector,
} from "../scripts/utils/formSelectors.js";
import {
  profileNameSelector,
  profileProffSelector,
  openerProfileEditBtnSelector,
  openerProfileAddCardBtnSelector,
} from "../scripts/utils/profileSelectors.js";

// Попапы
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";

// Прочие компоненты
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js"; // место наполнения карточками
import Card from "../scripts/components/Card.js";
import UserInfo from "../scripts/components/UserInfo.js"; // информация для профиля

const profileInfo = new UserInfo({
  name: profileNameSelector,
  value: profileProffSelector,
});

// Открывашки
const openerProfileButton = document.querySelector(
  openerProfileEditBtnSelector
);
const openerAddCardButton = document.querySelector(
  openerProfileAddCardBtnSelector
);

// Попапы
//  редактирования профиля
const profilEditPop = document.querySelector(popupEditProfileSelector);

// открытия новой карточки с фото
const newCardPopup = document.querySelector(popupAddCardSelector);

// открытия просмотра фото
const picViewPopup = document.querySelector(popupPicviewSelector);

// Закрывашки
const closerProfileEdit = profilEditPop.querySelector(
  `${popupEditProfileSelector} ${popupWithFormCloserSelector}`
);

const closerAddPhoto = newCardPopup.querySelector(
  `${popupAddCardSelector} ${popupWithFormCloserSelector}`
);
const closerViewPhoto = picViewPopup.querySelector(
  popupWithPicveiwCloserSelector
);

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
  `${popupEditProfileSelector} ${formValueInputSelector}`
);

// Попапы всех видов и сразу слушатели
const popupWithImage = new PopupWithImage(popupPicviewSelector);
popupWithImage.setEventListeners();

const popupAddCard = new PopupWithForm(
  {
    handlerSubmitForm: (data) => {
      cardsList.addItem(createCard(data.placeName, data.pictLink));
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
      profilInfo.setUserInfo(data.name, data.value);
      popupEditProfile.close();
    },
  },
  popupEditProfileSelector
);
popupEditProfile.setEventListeners();

const createCard = (name, value) => {
  const card = new Card(
    {
      name: name,
      value: value,
      handleCardClick: () => popupWithImage.open(name, value),
    },

    cardTemplateSelector
  );
  return card.makeCard();
};

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item.name, item.link);
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
  const { name, value } = profilInfo.getUserInfo();
  profNameInput.value = name;
  profJobInput.value = value;
  popupEditProfile.open();
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
