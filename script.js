let openPopUp = document.querySelector(".profile__edit-button");
let closePopUp = document.querySelector(".popup__close-button");
let popUp = document.querySelector(".popup");

openPopUp.addEventListener('click', function() {
    popUp.classList.add('popup_opened');
})

closePopUp.addEventListener('click', function() {
    popUp.classList.remove('popup_opened');
})

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__name");
let jobInput = document.querySelector(".popup__job");

function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector(".profile__title").textContent = nameInput.value;
    document.querySelector(".profile__subtitle").textContent = jobInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);