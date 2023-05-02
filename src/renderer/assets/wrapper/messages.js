class Messages {
    constructor(obj) {
        this.ws = obj.ws;
        this.crypto = obj.crypto;
        //
        this.nickname = obj.nickname;
        this.ip = obj.ip;
        this.crypt = obj.crypt;
        this.key = obj.key;
        this.session = obj.session;
    }
    send() {
        console.log(this.session);
        const encrypted = this.crypt.encryptMessage('Hello world!', this.key);
        this.session.send({ type: "msg", data: encrypted });
        // return this.crypt.decryptMessage(encrypted.data,encrypted.iv,key)
    }
    on() {

    }
}
module.exports = Messages;