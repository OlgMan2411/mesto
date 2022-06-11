// import { formDelCardSelector } from "../utils/formSelectors.js";

export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;

        this._urlCards = `${this._url}/cards`;
        this._urlProfile = `${this._url}/users/me`
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Ошибка! ' + res.status)
    }

    getUserInfo() {
        return fetch(this._urlProfile, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._handleResponse)
    }

    getCards() {
        return fetch(this._urlCards, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._handleResponse)
    }

    editAvatar(data) {
        return fetch(`${this._urlProfile}/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._handleResponse)
    }

    createElement(data) {
        return fetch(this._urlCards, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._handleResponse)
    }

    setLikeState(likeOnState, cardId) {
        if (likeOnState) {
            return fetch(`${this._urlCards}/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers
            }).then(this._handleResponse)
        } else {
            return fetch(`${this._urlCards}/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers
            }).then(this._handleResponse)
        }
    }

    deleteElement(cardId) {
        return fetch(`${this._urlCards}/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
            body: JSON.stringify({ _id: cardId })
        })
            .then(this._handleResponse);
    }

    updateUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._handleResponse)

    }
}
