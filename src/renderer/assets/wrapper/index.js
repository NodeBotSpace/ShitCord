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
    this.key = Buffer.from("1df255fa2d20b69ee2b320b90edca5fe5cca38817914acdab587b1109292ccf8",'hex');
    this.session = new ws(this.ip),
    //
    this.crypt = new Crypt(this),
      this.auth = new Auth(this),
      this.messages = new Messages(this)
  }
  setKey(key) {
    this.key = key;
  }
}
module.exports = Wrapper
