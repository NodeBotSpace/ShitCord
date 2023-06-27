export default class Auth {
  constructor(obj) {
    this.wrapper = obj;
  }
  login({ username = null, password = null, token = null }) {
    if (token) {
      const data = JSON.stringify({ type: "login", token: token })
    } else if (username && password) {
      const data = JSON.stringify({ type: "login", username: username, password: password });
    }
    this.wrapper.session.send(data)
    this.wrapper.setUsername(username)
    return;
  }
  register(username, password) {
    const data = JSON.stringify({type:"register",username:username,password:password})
    this.wrapper.session.send(data)
    this.wrapper.setUsername(username)
    return
  }
  logout() {

  }
}