// Набор действий и переменных для работы с попапом. 
// Сначала - редактирование имени и профессии профиля (где Кусто)


let openPopup = document.querySelector(".profile__edit-batton");
let closePopup = document.querySelector(".popup__closed");
let popup = document.querySelector(".popup");
let formElement = document.querySelector(".form");
let fullNameInput = document.querySelector(".form__input_name_fullname");
let professionInput = document.querySelector(".form__input_name_profession");
let saveInput = document.querySelector('.form__saved');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

function popupOpener() {
    popup.classList.add('popup_opened');
    fullNameInput.value = profileName.textContent;
    professionInput.value = profileProfession.textContent
}

function popupCloser() {
    popup.classList.remove('popup_opened');
}


function formSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = fullNameInput.value;
    profileProfession.textContent = professionInput.value;
    popupCloser()  
}

openPopup.addEventListener('click', popupOpener);

closePopup.addEventListener('click', popupCloser);

formElement.addEventListener('submit', formSubmit);

// Заполняем предустановленные карточки

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


const elementTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements'); 
  
initialCards.forEach((item) => {
  // клонируем содержимое тега template  
  const addElement = elementTemplate.querySelector('.elements__element').cloneNode(true);

  // наполняем содержимым
  addElement.querySelector('.elements__foto').src = item.link;  
  addElement.querySelector('.elements__title').textContent = item.name;  

  // отображаем на странице
  elements.append(addElement);
  
});

const buttons = document.querySelectorAll('.elements__like');
const buttonLike = Array.from(buttons);

buttonLike.addEventListener('click', function(evt) {
  console.log('Кликнули')
  evt.target.classList.toggle('elements__like_active')
}
);



// saveInput.addEventListener('click', popupCloser);