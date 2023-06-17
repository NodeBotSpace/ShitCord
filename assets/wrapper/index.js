import Auth from "./auth.js"
import Message from "./message.js"

import WebSocket from 'isomorphic-ws';

export default class Wrapper {
  constructor({ nickname = null, ip = "ws://localhost:8080" }) {
    this.nickname = nickname;
    this.ip = ip;
    this.session = new WebSocket(this.ip);
    //
    this.message = new Message(this);
    this.auth = new Auth(this);
  }
}