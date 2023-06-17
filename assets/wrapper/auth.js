export default class Auth {
  constructor(obj) {
    this.nickname = obj.nickname;
    this.session = obj.session;
  }
  signin() {
    const data = JSON.stringify({ type: "auth", login: this.nickname });
    this.session.send(data)
    return;
  }
  logout() {

  }
}