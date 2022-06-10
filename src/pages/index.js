import "../pages/index.css";

// Переменные
// import initialCards from "../scripts/utils/cardsData.js";
import validClasses from "../scripts/utils/validClassesSelectors.js";
import {
  cardTemplateSelector,
  containerSelector,
} from "../scripts/utils/cardSelectorsClasses.js";
import {
  popupEditProfileSelector,
  popupAddCardSelector,
  popupPicviewSelector,
  popupDelCardSelector,
  popupEditAvatarSelector,
  popupWithFormCloserSelector,
  popupWithPicveiwCloserSelector,
} from "../scripts/utils/popupSelectorsClasses.js";
import {
  formSelector,
  formDelCardSelector,
  formNameInputSelector,
  formValueInputSelector,
} from "../scripts/utils/formSelectors.js";
import {
  profileNameSelector,
  profileProffSelector,
  profileAvatarSelector,
  openerProfileEditBtnSelector,
  openerProfileAddCardBtnSelector,
  openerProfileEditAvatarBtnSelector,
} from "../scripts/utils/profileSelectors.js";

// Попапы
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";

// Прочие компоненты
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js"; // место наполнения карточками
import Card from "../scripts/components/Card.js";
import UserInfo from "../scripts/components/UserInfo.js"; // информация для профиля

import userCreds from "../scripts/utils/userCreds.js";

const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.addItem(createCard(item, myUserId));
    },
  },
  containerSelector
);

import Api from "../scripts/components/Api.js";

const avatarElement = document.querySelector(profileAvatarSelector);

const api = new Api({
  url: `https://mesto.nomoreparties.co/v1/${userCreds.cohortId}`,
  headers: {
    authorization: userCreds.authToken,
    'Content-Type': 'application/json'
  }
})

// Этим переменным присвоим значение потом, после скачивания данных с сервера
let userName;
let userAbout;
let userAvatar;
let myUserId;

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([data, cards]) => {
    profileInfo.setUserInfo({ name: data.name, value: data.about });

    userName = data.name;
    userAbout = data.about;
    userAvatar = data.avatar;
    myUserId = data._id;
    avatarElement.src = userAvatar

    cardsList.renderItems(cards);
  })
  .catch(err => {
    console.log(err);
  });


const profileInfo = new UserInfo({
  nameSelector: profileNameSelector,
  valueSelector: profileProffSelector,
  avatarSelector: profileAvatarSelector,
});


// Открывашки
const openerProfileButton = document.querySelector(
  openerProfileEditBtnSelector
);
const openerAddCardButton = document.querySelector(
  openerProfileAddCardBtnSelector
);
const openerEditAvatarButton = document.querySelector(
  openerProfileEditAvatarBtnSelector
);


// Попапы
//  редактирования профиля
const profilEditPop = document.querySelector(popupEditProfileSelector);

// открытия новой карточки с фото
const newCardPopup = document.querySelector(popupAddCardSelector);


// Закрывашки
const closerProfileEdit = profilEditPop.querySelector(
  `${popupEditProfileSelector} ${popupWithFormCloserSelector}`
);

const closerAddPhoto = newCardPopup.querySelector(
  `${popupAddCardSelector} ${popupWithFormCloserSelector}`
);

const closerViewPhoto = document
  .querySelector(popupPicviewSelector)
  .querySelector(popupWithPicveiwCloserSelector);

const closerDelCard = document
  .querySelector(popupDelCardSelector)
  .querySelector(popupWithFormCloserSelector);

const closerEditAvatar = document
  .querySelector(popupEditAvatarSelector)
  .querySelector(popupWithFormCloserSelector);


// Включение валидации
const formValidators = {};
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
const popupEditAvatar = new PopupWithForm({
  handlerSubmitForm: (data) => {
    popupEditAvatar.renderLoading(true);
    api.editAvatar({
      avatar: data.pictLink
    })
      .then(() => {
        popupEditAvatar.close();
        window.location.reload();
      })
      .catch(err => console.log(err))
      .finally(() => popupEditAvatar.renderLoading(false));
  },
}, popupEditAvatarSelector);
popupEditAvatar.setEventListeners();

const popupDelCard = new PopupWithForm({
  handlerSubmitForm: () => {
    api.deleteElement().then(() => {
      popupDelCard.close();
      window.location.reload();
    }).catch(err => console.log(err));

    popupDelCard.close();
  },
},
  popupDelCardSelector);
popupDelCard.setEventListeners();

const popupWithImage = new PopupWithImage(popupPicviewSelector);
// popupWithImage.setEventListeners();

const popupAddCard = new PopupWithForm(
  {
    handlerSubmitForm: (data) => {
      popupEditAvatar.renderLoading(true);
      api.createElement({
        name: data.placeName,
        link: data.pictLink
      })
        .then((data) => {
          cardsList.addItem(createCard(data, myUserId));
          newCardPopup.querySelector(formSelector).reset();
          popupAddCard.close();
        })
        .catch(err => console.log(err))
        .finally(() => popupEditAvatar.renderLoading(false));
    },
  },
  popupAddCardSelector
);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(
  {
    handlerSubmitForm: (data) => {
      popupEditAvatar.renderLoading(true);
      api.updateUserInfo({
        name: data.name,
        about: data.value
      }).then(data => {
        profileInfo.setUserInfo({ name: data.name, value: data.about });
      })
        .catch(err => console.log(err))
        .finally(() => popupEditAvatar.renderLoading(false));

      popupEditProfile.close();
    },
  },
  popupEditProfileSelector
);
popupEditProfile.setEventListeners();

const createCard = (data, userId) => {
  const card = new Card(
    {
      data,
      userId,
      handleCardClick: () => popupWithImage.open(data.name, data.link),
      handleDelClick: () => {
        // console.log('Открываем попап удаления. Здесь id: ' + data._id);
        document.querySelector(formDelCardSelector).id = data._id;
        popupDelCard.open();
      },
      handleLikeCount: () => {
        api.setLikeState(card.likeState, data._id).then(data => {
          card.setLikesNum(data.likes.length);
        }).catch(err => console.log(err));
      }
    },

    cardTemplateSelector
  );
  return card.makeCard();
};

// Слушаем, открываем
openerAddCardButton.addEventListener("click", () => {
  formValidators["addCard"].deactivateSaveButton();
  popupAddCard.open();
});

openerProfileButton.addEventListener("click", () => {
  profNameInput.value = userName;
  profJobInput.value = userAbout;
  popupEditProfile.open();
});

openerEditAvatarButton.addEventListener("click", () => {
  popupEditAvatar.open();
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

closerDelCard.addEventListener("click", () => {
  popupDelCard.close();
});

closerEditAvatar.addEventListener("click", () => {
  popupEditAvatar.close();
});
