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

// saveInput.addEventListener('click', popupCloser);