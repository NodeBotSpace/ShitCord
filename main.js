const elec = require('electron')
//require('update-electron-app')()
const path = require('node:path')

elec.app.setName('ShitCord')
elec.app.whenReady().then(() => {
    const window = new elec.BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname,'/src/frontend/app.ico'),
        webPreferences: {
            preload: path.join(__dirname,'/src/backend/preload.js')
        },
        titleBarStyle: 'hidden',
        // webPreferences: {
        //     nodeIntegration: true
        // }

    })
    window.loadFile(path.join(__dirname,'/src/frontend/index.html'))
    window.maximize()

    elec.desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
        for (const source of sources) {
            return window.webContents.send('SET_SOURCE', source.id)
        }
    })

    elec.ipcMain.on('wsConnectByIp', (event,ip) => {
        let out = require(path.join(__dirname,'src/backend/websocket.js')).init(ip,window)
        window.webContents.send('wsConnectCallback',out)
    })
})

elec.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') elec.app.quit()
})