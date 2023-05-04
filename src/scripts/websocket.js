const WebSocket = require('ws')
const msgcrypt = require('./msgcrypt')
const elec = require('electron')

function constrcutMsg(type,data,key){
    return JSON.stringify({type: type, data: msgcrypt.encryptMessage(data,key)})
}

function releaseListeners(srv,win) {
    let key

    srv.onmessage = event => {
        const msg = JSON.parse(event.data)

        // Выполняем проверку на ключ
        if (msg.type == 'key') {
            key = Buffer.from(msg.data, 'hex')
            console.log('Key received:', key.toString('hex'))
        }

        // Иначе парсим как обычное сообщение
        else if(msg.type=='msg'){
            try{
                const decryptedMessage = msgcrypt.decryptMessage(msg.data, key)
                console.log('[Server]', decryptedMessage)
                win.webContents.send('wsMsgIn', decryptedMessage)
            }catch(err){
                console.log(err)
                console.log('[Server(U)]', msg.data)
                win.webContents.send('wsMsgIn', msg.data)
            }
            // srv.send(encryptMessage(message,"msg"))
        }
    }

    function wsMsgSend(event, msg) {
        if(key){
            if(msg.startsWith('/auth ')){
                const login = msg.split(' ')[1]
                const pass = msg.split(' ')[2]
                srv.send(JSON.stringify({type:'auth',login:msgcrypt.encryptMessage(login,key),password:msgcrypt.encryptMessage(pass,key)}))
            }else{
                srv.send(constrcutMsg('msg',msg,key))
                console.log('Send >', msg)
            }
        }else{
            srv.send(msg)
            // srv.send(JSON.stringify({type:"msg",data:msg}))
            console.log('Send(U) >',msg)
        }
    }

    elec.ipcMain.addListener('wsMsgSend', wsMsgSend)

    srv.onclose = event => {
        let reason=event.reason
        if(event.reason=="") reason = "Not specified"
        console.log('CONNECTION LOST:',reason)
        win.webContents.send('wsDisconnected',reason)
        elec.ipcMain.removeListener('wsMsgSend',wsMsgSend)
        return delete srv, key
    }
}

module.exports = {
    init(ip, win) {
        const connectCallback = out => win.webContents.send('wsConnectCallback',out)
        try{
            const srv = new WebSocket(ip)
            srv.once('open',()=>{releaseListeners(srv,win);console.log('Connected to',ip);return connectCallback(true)})
            srv.once('error',err=>{console.log('ws:',err)})
        }catch(err){console.log('ws:',err)}
    }
}