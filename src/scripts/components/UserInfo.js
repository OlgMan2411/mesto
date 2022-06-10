export default class UserInfo {
  constructor({ nameSelector, valueSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._value = document.querySelector(valueSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      value: this._value.textContent,
      // avatar: this._avatar.src
    };
  }

  setUserAvatar(avatarSrc) {
    this._avatar.src = avatarSrc;
  }

  setUserInfo({ name, value }) {
    // console.log('Заполняем новыми данными сетку:')
    // console.log(name);
    // console.log(value);
    this._name.textContent = name;
    this._value.textContent = value;
    // this._avatar.src = data.avatar;
  }
}
