const ws = require("ws");
const crypto = require("node:crypto")

const Crypt = require('./crypt')
const Auth = require('./auth')
const Messages = require('./messages')

class Wrapper {
  constructor({ nickname = null, ip = "ws://localhost:8080" }) {
    this.ws = ws;
    this.crypto = crypto;
    //
    this.nickname = nickname;
    this.ip = ip;
    this.key = null;
    this.session = null;
    //
    this.crypt = new Crypt(this),
      this.auth = new Auth(this),
      this.messages = new Messages(this)
  }
  setKey(key) {
    this.key = key;
  }
  newSession(obj){
    this.session = obj;
    return this.session;
  }
}
module.exports = Wrapper
