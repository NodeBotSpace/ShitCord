export default class Message {
    constructor(obj){
        this.session = obj.session
    }
    send = (data) => this.session.send(data);
}