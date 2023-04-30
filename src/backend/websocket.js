const WebScoket = require('ws')
const msgcrypt = require('./msgcrypt')
const elec = require('electron')

function releaseListeners(srv,win) {
    srv.onopen = event => {
        console.log('Connected.')
    }

    let key

    srv.onmessage = event => {
        const msg = JSON.parse(event.data)

        // Выполняем проверку на ключ
        if (msg.type == 'msgKey') {
            console.log('Server message:', msg)
            key = Buffer.from(msg.data, 'hex')
            console.log('Key received:', key.toString('hex'))
        }

        // Иначе парсим как обычное сообщение
        else {
            const decryptedMessage = msgcrypt.decryptMessage(msg, key)
            console.log('[Server]', decryptedMessage)
            if (win != undefined) {
                win.webContents.send('wsMsgIn', '[Server] ' + decryptedMessage)
            }
            // srv.send(encryptMessage(message,"msg"))
        }
    }


    srv.onclose = event => {
        console.log('SERVER CLOSED', JSON.stringify(event))
    }

    elec.ipcMain.on('wsMsgSend', (event, msg) => {
        srv.send(msgcrypt.encryptMessage(msg, "msg", key))
        console.log('Sending', msg)
    })
}

module.exports = {
    init(ip, win) {
        let srv
        try {srv = new WebScoket(err)}
        catch (err) {return console.log('ws:', err)}
        releaseListeners(srv,win)
    }
}