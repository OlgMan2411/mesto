let openPopup = document.querySelector(".edit-batton");
let closePopup = document.querySelector(".popup__closed");
let popup = document.querySelector(".popup");

openPopup.addEventListener('click', function() {
    popup.classList.add('popup_opened');
})

closePopup.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
})

let formElement = document.querySelector(".popup__container");
let fullNameInput = document.querySelector(".popup__fullname");
let professionInput = document.querySelector(".popup__profession");

function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector(".profile__name").textContent = fullNameInput.value;
    document.querySelector(".profile__profession").textContent = professionInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);