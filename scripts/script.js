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

// Чистый элемент попапа
const blankPopup = document.querySelector('.popup');


let openProfilePopup = document.querySelector(".profile__edit-batton");

// function BlankPopup() {
//   const popupTemplate = document.querySelector('#popup-template').content;
//   return popupTemplate.querySelector('.popup').cloneNode(true);
// };

function profileOpener() {
  profilePopup = document.querySelector('.popup');
  console.log('Копия');
  console.log(profilePopup);
  const profileName = document.querySelector('.profile__name');
  const profileProfession = document.querySelector('.profile__profession');
  const profname = profilePopup.querySelector('.form__input_name-fild');  
  const profFild = profilePopup.querySelector('.form__input_profession-link-fild');  
  const closeProfPopup = profilePopup.querySelector(".popup__closed");
  const profform = profilePopup.querySelector(".form");
  
  profilePopup.classList.toggle('popup_opened');
  profilePopup.querySelector('.form__title').textContent = popupFillers[0].popTitle;

  profname.name = popupFillers[0].popNamePlaceholder;  
  profname.placeholder = popupFillers[0].popNamePlaceholder;  
  profname.value = profileName.textContent;
  
  profFild.name = popupFillers[0].popInfoPlaceholder;
  profFild.placeholder = popupFillers[0].popInfoPlaceholder;
  profFild.value = profileProfession.textContent;  
  
  closeProfPopup.addEventListener('click', function() {
    popupCloser(profilePopup);    
  }
  );
  
  profform.addEventListener('submit', function(evt) {
    evt.preventDefault();
    profileName.textContent = profname.value;
    profileProfession.textContent = profFild.value;    
    popupCloser(profilePopup);
  }
  );
};

function popupCloser(elementToClose) {
  elementToClose.classList.toggle('popup_opened');  
  elementToClose.replaceWith(blankPopup);
};

function popupPicCloser(elementToClose) {
  elementToClose.classList.toggle('popup-picview_opened');
};

openProfilePopup.addEventListener('click', profileOpener);



// Запуск попапа с добавлением карточки

let openAddCardPopup = document.querySelector('.profile__add-batton');

function addCardOpener() {
  addCardPopup = document.querySelector('.popup');

  const cardsContainer = document.querySelector('.elements');
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

// Накидываем карточек из уже имеющихся данных
initialCards.forEach((item) => {
  let newCard = makeCard(item.link, item.name);  
  elements.append(newCard);  
});

// Вызов окна просмотра фотографии
const openPicviewPopup = (link, name) => {  
  const picviewElements = document.querySelector('.popup-picview');
  const closePicPopup = picviewElements.querySelector(".popup-picview__closed");
  picviewElements.querySelector('.popup-picview__photo').src = link;
  picviewElements.querySelector('.popup-picview__title').textContent = name;
  picviewElements.classList.toggle('popup-picview_opened');
  
  closePicPopup.addEventListener('click', function() {
    popupPicCloser(picviewElements);
  }
  );

};