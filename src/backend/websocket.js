const WebSocket = require('ws')
const msgcrypt = require('./msgcrypt')
const elec = require('electron')

function releaseListeners(srv,win) {
    let key

    srv.onmessage = event => {
        const msg = JSON.parse(event.data)

        // Выполняем проверку на ключ
        if (msg.type == 'msgKey') {
            key = Buffer.from(msg.data, 'hex')
            console.log('Key received:', key.toString('hex'))
        }

        // Иначе парсим как обычное сообщение
        else {
            try{
                const decryptedMessage = msgcrypt.decryptMessage(msg, key)
                console.log('[Server]', decryptedMessage)
                win.webContents.send('wsMsgIn', '[Server] ' + decryptedMessage)
            }catch{
                console.log('[Server]', msg)
                win.webContents.send('wsMsgIn', '[Server] '+ msg)
            }
            // srv.send(encryptMessage(message,"msg"))
        }
    }

    function wsMsgSend(event, msg) {
        if(key){
            srv.send(msgcrypt.encryptMessage(msg, "msg", key))
            console.log('Send(S) >', msg)
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