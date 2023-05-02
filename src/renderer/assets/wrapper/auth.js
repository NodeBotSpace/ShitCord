class Auth {
    constructor(obj) {
        this.ws = obj.ws;
        this.crypt = obj.crypt;
        //
        this.nickname = obj.nickname;
        this.ip = obj.ip;
        this.key = obj.key;
        this.setKey = obj.setKey;
        this.session = obj.session;
        this.newSession = obj.newSession;

        // this.loginData = null;
    }
    signin() {
        const session = new this.ws(this.ip)

        let dataPromise = new Promise(resolve => {
          session.once('message', event => {
            const msg = JSON.parse(event.toString());
            if (msg.type === 'msgKey') {
              this.setKey(Buffer.from(msg.data, 'hex'));
              const data = { type: "auth", login: this.crypt.encryptMessage(this.nickname, this.key) };
              resolve(data);
            }
          });
        });
        this.newSession(session)
        return dataPromise;
    }
    logout() {

    }
}
module.exports = Auth;