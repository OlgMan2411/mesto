export default class UserInfo {
  constructor({ name, value }) {
    this._name = document.querySelector(name);
    this._value = document.querySelector(value);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      value: this._value.textContent,
    };
  }

  setUserInfo(name, value) {
    this._name.textContent = name;
    this._value.textContent = value;
  }
}
