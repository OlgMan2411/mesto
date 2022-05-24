export default class UserInfo {
  constructor({ name, profLink }) {
    this._name = document.querySelector(name);
    this._profLink = document.querySelector(profLink);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      profLink: this._profLink.textContent,
    };
  }

  setUserInfo(name, profLink) {
    this._name.textContent = name;
    this._profLink.textContent = profLink;
  }
}
