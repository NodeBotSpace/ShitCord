import Auth from "./auth.js"
import Message from "./message.js"

import WebSocket from 'isomorphic-ws';

export default class Wrapper {
  constructor({ ip = "ws://localhost:8080" }) {
    this.username = String;
    this.ip = ip;
    this.session = new WebSocket(this.ip);
    //
    this.message = new Message(this);
    this.auth = new Auth(this);
    //
    this.setUsername = (username) => this.username = username
  }
}