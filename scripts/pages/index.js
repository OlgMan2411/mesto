import initialCards from "../constants/cardsData.js";
import validClasses from "../constants/validClassesSelectors.js";
import FormValidator from "../FormValidator.js";
import Card from "../Card.js";

// Открывашки
const openerProfileButton = document.querySelector(".profile__edit-batton");
const openerAddCardButton = document.querySelector(".profile__add-batton");

// Список форм
const formList = Array.from(
  document.querySelectorAll(validClasses.formSelector)
);

// Попап редактирования профиля
const profilEditPop = document.querySelector(".popup_type_profileEdit");

// Попап открытия новой карточки с фото
const newCardPopup = document.querySelector(".popup_type_addCard");

// Попап открытия просмотра фото
const picviewPopup = document.querySelector(".popup_type_picview");

// Закрывашки
const closerProfileEdit = profilEditPop.querySelector(
  ".popup_type_profileEdit .popup__closed"
);
const closerAddPhoto = newCardPopup.querySelector(
  ".popup_type_addCard .popup__closed"
);
const closerViewPhoto = picviewPopup.querySelector(".popup__closed_picview");

// Уже заполненные поля пользователя
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

// Поля ввода профиля пользователя
const profNameInput = profilEditPop.querySelector(
  ".popup_type_profileEdit .form__input_name"
);
const profJobInput = profilEditPop.querySelector(
  ".popup_type_profileEdit .form__input_profession"
);

// Поля ввода новой карточки с фото
const addCardfNameInput = newCardPopup.querySelector(
  ".popup_type_addCard .form__input_name"
);
const addCardLinkInput = newCardPopup.querySelector(
  ".popup_type_addCard .form__input_profession"
);

// Шаблон новой карточки и куда ее вставляем profileFormSubmitHandler
const elements = document.querySelector(".elements");

// Кнопки сохранения
const newCardSaveBtn = newCardPopup.querySelector(".form__save");

// Элементы просмотра фотографии
const picviewPopupPhoto = picviewPopup.querySelector(".popup__photo");
const picviewPopupTitle = picviewPopup.querySelector(".popup__title");

// Вызов окна просмотра фотографии
const openPicviewPopup = (link, name) => {
  picviewPopupPhoto.src = link;
  picviewPopupPhoto.alt = name;
  picviewPopupTitle.textContent = name;
  openPopup(picviewPopup);
};

const setSaveBtnInactive = (buttonElement) => {
  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.remove("form__save_active");
};

function openEditProfilePopup() {
  profNameInput.value = profileName.textContent;
  profJobInput.value = profileProfession.textContent;
  openPopup(profilEditPop);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("click", closePopupByOutClick);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
  popup.removeEventListener("click", closePopupByOutClick);
}

// Закрыть попап нажатием esc
const closeByEsc = (event) => {
  if (event.key === "Escape") {
    const currentPopup = document.querySelector(".popup_opened");
    closePopup(currentPopup);
  }
};

function closeAddPhotoPopup() {
  closePopup(newCardPopup);
  addCardfNameInput.value = "";
  addCardLinkInput.value = "";
}

function profileFormSubmitHandler() {
  profileName.textContent = profNameInput.value;
  profileProfession.textContent = profJobInput.value;

  closePopup(profilEditPop);
}

function addCardFormSubmitHandler() {
  const card = new Card(
    addCardLinkInput.value,
    addCardfNameInput.value,
    "#element-template",
    openPicviewPopup
  );
  const cardElement = card.renderElements();
  elements.prepend(cardElement);

  closeAddPhotoPopup();
}

// Закрыватель попапа по клику вне
const closePopupByOutClick = (evt) => {
  const clickedElem = evt.target;
  if (clickedElem.classList.contains("popup_opened")) {
    closePopup(clickedElem);
  }
};

// Слушатели открытия попапа редактирования профиля
// открыть
openerProfileButton.addEventListener("click", () => {
  openEditProfilePopup();
  // setSaveBtnInactive(profileFormSaveBtn);
});

// заполнить введенными данными
profilEditPop.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileFormSubmitHandler();
});

// закрыть
closerProfileEdit.addEventListener("click", () => {
  closePopup(profilEditPop);
});

// Слушатели попапа ввода новой фотки
// открыть
openerAddCardButton.addEventListener("click", () => {
  setSaveBtnInactive(newCardSaveBtn);
  openPopup(newCardPopup);
});

// заполнить введенными данными
newCardPopup.addEventListener("submit", function (evt) {
  evt.preventDefault();
  addCardFormSubmitHandler();
});

// закрыть
closerAddPhoto.addEventListener("click", () => {
  closeAddPhotoPopup();
});

// Закрывашка просмотра фото
closerViewPhoto.addEventListener("click", () => {
  closePopup(picviewPopup);
});

formList.forEach((rawFormElement) => {
  const formElement = new FormValidator(validClasses, rawFormElement);
  formElement.enableValidation();
});

// Накидываем карточек из уже имеющихся данных
initialCards.forEach((item) => {
  const card = new Card(
    item.name,
    item.link,
    "#element-template",
    openPicviewPopup
  );
  const cardElement = card.renderElements();
  elements.append(cardElement);
});
