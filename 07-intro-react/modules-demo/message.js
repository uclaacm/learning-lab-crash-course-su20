// message.js
class Message {
    constructor(sender, recepient, contents) {
        this.sender = sender;
        this.recepient = recepient;
        this.contents = contents;
        this.timeSent = null;
    }

    static from(someString) {
        let m = new Message();
        m.contents = someString;
        return m;
    }

    send() {
        console.log('sent the message.');
        this.timeSent = new Date();
    }

    read() {
        console.log(this.contents);
        this.timeReceived = new Date();
    }

    get content() { return this.contents; }
    set content(c) { this.contents = c; }
}

export default Message;