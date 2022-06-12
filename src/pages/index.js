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
} from "../scripts/utils/popupSelectorsClasses.js";
import {
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
import PopupDelCardSubmit from '../scripts/components/PopupDelCardSubmit.js'

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

let myUserId;

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([data, cards]) => {
    profileInfo.setUserInfo({ name: data.name, value: data.about });

    myUserId = data._id;
    avatarElement.src = data.avatar

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
      .then((data) => {
        profileInfo.setUserAvatar(data.avatar)
        popupEditAvatar.close();
        // window.location.reload();
        ;
      })
      .catch(err => console.log(err))
      .finally(() => popupEditAvatar.renderLoading(false));
  },
}, popupEditAvatarSelector);
popupEditAvatar.setEventListeners();

const popupDelCard = new PopupDelCardSubmit(popupDelCardSelector);
popupDelCard.setEventListeners();

const popupWithImage = new PopupWithImage(popupPicviewSelector);
popupWithImage.setEventListeners();

const popupAddCard = new PopupWithForm(
  {
    handlerSubmitForm: (data) => {
      popupAddCard.renderLoading(true);
      api.createElement({
        name: data.placeName,
        link: data.pictLink
      })
        .then((data) => {
          cardsList.addItem(createCard(data, myUserId));
          popupAddCard.close();
        })
        .catch(err => console.log(err))
        .finally(() => popupAddCard.renderLoading(false));
    },
  },
  popupAddCardSelector
);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(
  {
    handlerSubmitForm: (data) => {
      popupEditProfile.renderLoading(true);
      api.updateUserInfo({
        name: data.name,
        about: data.value
      }).then(data => {
        profileInfo.setUserInfo({ name: data.name, value: data.about });
        popupEditProfile.close();
      })
        .catch(err => console.log(err))
        .finally(() => popupEditProfile.renderLoading(false));      
    },
  },
  popupEditProfileSelector
);
popupEditProfile.setEventListeners();

const createCard = (data, userId) => {
  const cardId = data._id
  const card = new Card(
    {
      data,
      userId,
      handleCardClick: () => popupWithImage.open(data.name, data.link),

      handleLikeCount: () => {
        api.setLikeState(card.likeState, cardId).then(data => {
          card.setLikesNum(data.likes.length);
        }).catch(err => console.log(err));
      },

      handleSubmitDel: () => {
        popupDelCard.open();

        popupDelCard.handlerSubmitAct(() => {
          // console.log('Дошло до отправки на сервер');
          api.deleteElement(cardId)
            .then(() => {
              // const id = elementDelCardId.getAttribute('id')
              // console.log(`Удаляем карту с id ${cardId}`);            

              card.clearThisElement();
              popupDelCard.close();
            })
            .catch(err => console.log(err));
        });
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
  const userData = profileInfo.getUserInfo()
  profNameInput.value = userData.name;
  profJobInput.value = userData.value;
  popupEditProfile.open();
});

openerEditAvatarButton.addEventListener("click", () => {
  popupEditAvatar.open();
});


