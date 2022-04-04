const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Элементы открывания попапов
const openProfileButton = document.querySelector(".profile__edit-batton");
const openAddCardButton = document.querySelector('.profile__add-batton');

// Закрывашки
const closeProfileEdit = document.querySelector('.popup_type_profileEdit .popup__closed');
const closeAddPhoto = document.querySelector('.popup_type_addCard .popup__closed');
const closeViewPhoto = document.querySelector('.popup__closed_picview');

// Уже заполненные поля пользователя
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

// Поля ввода профиля пользователя
const profNameInput = document.querySelector('.popup_type_profileEdit .form__input_name');  
const profJobInput = document.querySelector('.popup_type_profileEdit .form__input_profession');

// Попап редактирования профиля
const profilEditPop = document.querySelector('.popup_type_profileEdit');

// Попап открытия новой карточки с фото
const newCardPopup = document.querySelector('.popup_type_addCard');

// Попап открытия просмотра фото
const picviewPopup = document.querySelector('.popup_type_picview');

// Поля ввода новой карточки с фото
const addCardfNameInput = newCardPopup.querySelector('.popup_type_addCard .form__input_name');  
const addCardLinkInput = newCardPopup.querySelector('.popup_type_addCard .form__input_profession');

// Куда шаблон новой карточки и куда ее вставляем
const elementTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements'); 

// Для слушателя кнопки сохранения профиля
const profileFormSave = document.querySelector('.popup_type_profileEdit .form__saved');

// Для слушателя кнопки сохранения профиля
const newCardSave = newCardPopup.querySelector('.popup_type_addCard .form__saved');

const makeCard = (link, name) => {
  // клонируем содержимое тега template  
  const addElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  const heartToCheck = addElement.querySelector('.elements__like');
  const toDelete = addElement.querySelector('.elements__delete');
  const toPicview = addElement.querySelector('.elements__foto');

  // наполняем содержимым
  toPicview.src = link;  
  addElement.querySelector('.elements__title').textContent = name;

  heartToCheck.addEventListener('click', function() {
    heartToCheck.classList.toggle('elements__like_active');
  });

  toDelete.addEventListener('click', function() {
    addElement.remove();
  } );

  toPicview.addEventListener('click', function() {
    openPicviewPopup(link, name);
  });
  return addElement;
};

function openEditProfilePopup() {
  profilEditPop.classList.toggle('popup_opened');
  profNameInput.value = profileName.textContent;
  profJobInput.value = profileProfession.textContent;
};

function openPopup(popup) {
  popup.classList.toggle('popup_opened');
};

function closePopup(popup) {
  popup.classList.toggle('popup_opened');
};

function closeAddPhotoPopup() {
  newCardPopup.classList.toggle('popup_opened');
  addCardfNameInput.value = '';
  addCardLinkInput.value = '';
};

function profileFormSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = profNameInput.value;
  profileProfession.textContent = profJobInput.value;  
  closePopup(profilEditPop)    
};

function addCardFormSubmitHandler (evt) {
  evt.preventDefault(); 
  elements.prepend(makeCard(addCardLinkInput.value, addCardfNameInput.value));    
  closePopup(newCardPopup);
};

// Слушатели попапа редактирования профиля
openProfileButton.addEventListener('click', () => {openEditProfilePopup()});
closeProfileEdit.addEventListener('click', () => {closePopup(profilEditPop)});
profileFormSave.addEventListener('click', profileFormSubmitHandler);

// Слушатели попапа ввода новой фотки
openAddCardButton.addEventListener('click', () => {openPopup(newCardPopup)});
closeAddPhoto.addEventListener('click', () => {closeAddPhotoPopup()});
newCardSave.addEventListener('click', addCardFormSubmitHandler);


// Вызов окна просмотра фотографии
const openPicviewPopup = (link, name) => {  
  picviewPopup.querySelector('.popup__photo').src = link;
  picviewPopup.querySelector('.popup__title').textContent = name;
  picviewPopup.querySelector('.popup__photo').alt = name;  
  openPopup(picviewPopup);
};

closeViewPhoto.addEventListener('click', () => {closePopup(picviewPopup)});

// Накидываем карточек из уже имеющихся данных
initialCards.forEach((item) => {
  const newCard = makeCard(item.link, item.name);  
  elements.append(newCard);  
});