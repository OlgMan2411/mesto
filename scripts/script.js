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

let openPopup = document.querySelector(".profile__edit-batton");
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

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

openPopup.addEventListener('click', profileOpener);


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

// buttonLike.addEventListener('click', function(evt) {
//   console.log('Кликнули')
//   evt.target.classList.toggle('elements__like_active')
// }
// );



// saveInput.addEventListener('click', popupCloser);