// Набор действий и переменных для работы с попапом. 
// Сначала - редактирование имени и профессии профиля (где Кусто)

// Заголовки попапов:
const popupFillers = [
  {
    popTitle: 'Редактировать профиль',    
    popNamePlaceholder: 'Имя пользователя',
    popInfoPlaceholder: 'профессия',
  },
  {
    popTitle: 'Новое место',
    popNamePlaceholder: 'Название',
    popInfoPlaceholder: 'Ссылка на картинку',
  },
]

// Профиль - попап
let openProfilePopup = document.querySelector(".profile__edit-batton");

// Переменные для заполнения текущим значением полей попапа
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let cardsContainer = document.querySelector('.elements');

function BlankPopup() {
  const popupTemplate = document.querySelector('#popup-template').content;  
  return popupTemplate.querySelector('.popup').cloneNode(true);
};

function profileOpener() {
  profilePopup = BlankPopup();
  const nameFild = profilePopup.querySelector('.form__input_name-fild');
  const profLinkFild = profilePopup.querySelector('.form__input_profession-link-fild');
  const closePopup = profilePopup.querySelector(".popup__closed");
  const form = profilePopup.querySelector(".form");
  
  profilePopup.classList.toggle('popup_opened'); //querySelector(".popup").  
  profilePopup.querySelector('.form__title').textContent = popupFillers[0].popTitle;

  nameFild.name = popupFillers[0].popNamePlaceholder;  
  nameFild.placeholder = popupFillers[0].popNamePlaceholder;  
  nameFild.value = profileName.textContent;
  
  profLinkFild.name = popupFillers[0].popInfoPlaceholder;
  profLinkFild.placeholder = popupFillers[0].popInfoPlaceholder;
  profLinkFild.value = profileProfession.textContent;
  
  document.querySelector('.root').append(profilePopup);
  
  closePopup.addEventListener('click', function() {
    popupCloser(profilePopup);
  }
  );
  
  form.addEventListener('submit', function(evt) {
    evt.preventDefault();    
    inputFill(nameFild, profLinkFild);    
    popupCloser(profilePopup  );  
  }
  );
};

function popupCloser(elementToClose) {
  elementToClose.classList.toggle('popup_opened');
  elementToClose.remove();
};

function inputFill(name, profLink) {
  profileName.textContent = name.value;
  profileProfession.textContent = profLink.value;
};

openProfilePopup.addEventListener('click', profileOpener);

let openAddCardPopup = document.querySelector('.profile__add-batton');

function addCardOpener() {
  addCardPopup = BlankPopup();
  const nameFild = addCardPopup.querySelector('.form__input_name-fild');
  const profLinkFild = addCardPopup.querySelector('.form__input_profession-link-fild');
  const closePopup = addCardPopup.querySelector(".popup__closed");
  const form = addCardPopup.querySelector(".form");
  
  addCardPopup.classList.toggle('popup_opened'); //querySelector(".popup").  
  addCardPopup.querySelector('.form__title').textContent = popupFillers[1].popTitle;

  nameFild.classList.add('form__input_grey-placehold');
  nameFild.name = popupFillers[1].popNamePlaceholder;  
  nameFild.placeholder = popupFillers[1].popNamePlaceholder;    
  
  profLinkFild.classList.add('form__input_grey-placehold');
  profLinkFild.name = popupFillers[1].popInfoPlaceholder;
  profLinkFild.placeholder = popupFillers[1].popInfoPlaceholder;
    
  document.querySelector('.root').append(addCardPopup);
  
  closePopup.addEventListener('click', function() {
    popupCloser(addCardPopup);
  }
  );
  
  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    
    newCard = makeCard(profLinkFild.value, nameFild.value);    
    cardsContainer.prepend(newCard);    
    popupCloser(addCardPopup);  
  }
  );
};

openAddCardPopup.addEventListener('click', addCardOpener);




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

const makeCard = (link, name) => {
  // клонируем содержимое тега template  
  const addElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  const heartToCheck = addElement.querySelector('.elements__like');
  const toDelete = addElement.querySelector('.elements__delete');

  // наполняем содержимым
  addElement.querySelector('.elements__foto').src = link;  
  addElement.querySelector('.elements__title').textContent = name;
  heartToCheck.addEventListener('click', function() {
    heartToCheck.classList.toggle('elements__like_active');
  });
  toDelete.addEventListener('click', function() {
    addElement.remove();
  } );

  return addElement;
};


// Накидываем карточек из уже имеющихся данных
initialCards.forEach((item) => {
  let newCard = makeCard(item.link, item.name);  
  elements.append(newCard);  
});
