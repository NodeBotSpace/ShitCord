const WebScoket = require('ws')
const msgcrypt = require('./msgcrypt.js')
const elec = require('electron')
const message = "далбаю"
let key //оставляем как есть, ключ будет определён при его получении

// Подключаемся к серверу
const srv = new WebScoket('ws://localhost:8080')

srv.onopen = event => {
    console.log('Connected.')
}

srv.onmessage = event => {
    const msg = JSON.parse(event.data)

    // Выполняем проверку на ключ
    if (msg.type == 'msgKey') {
        console.log('Server message:',msg)
        key = Buffer.from(msg.data,'hex')
        console.log('Key received:',key.toString('hex'))
    }
    
    // Иначе парсим как обычное сообщение
    else {
        const decryptedMessage = msgcrypt.decryptMessage(msg,key)
        console.log('[Server]',decryptedMessage)
        elec.ipcMain.emit('wsMsg',decryptedMessage)
        // srv.send(encryptMessage(message,"msg"))
    }
}

srv.onclose = event => {
    console.log('SERVER CLOSED', JSON.stringify(event))
}

elec.ipcMain.on('wsMsgSend',(event, msg)=>{
    const webContents = event.sender
    const win = elec.BrowserWindow.fromWebContents(webContents)
    srv.send(msgcrypt.encryptMessage(msg,"msg",key))
    console.log('Sending',msg)
})