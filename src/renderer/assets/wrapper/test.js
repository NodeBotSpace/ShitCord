const Wrapper = require("./index.js");
const Crypto = require('node:crypto')

const wrapper = new Wrapper({
    nickname: "test"
});
// console.log(wrapper.messages.send())
// console.log(wrapper.crypt.encryptMessage('Meow',Crypto.randomBytes(32)))
wrapper.auth.signin().then((res) => {
    console.log(res)
    wrapper.messages.send()
})
// wrapper.messages.send()