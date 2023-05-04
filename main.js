const elec = require('electron')
//require('update-electron-app')()
const path = require('node:path')

elec.app.setName('ShitCord')
elec.app.whenReady().then(() => {
    const window = new elec.BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname,'/src/renderer/app.ico'),
        webPreferences: {
            preload: path.join(__dirname,'/src/scripts/preload.js')
        },
        // titleBarStyle: 'hidden',
        // webPreferences: {
        //     nodeIntegration: true
        // }

    })
    window.loadFile(path.join(__dirname,'/src/renderer/index.html'))
    // window.maximize()

    elec.desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
        for (const source of sources) {
            return window.webContents.send('SET_SOURCE', source.id)
        }
    })

    elec.ipcMain.on('wsConnectByIp', (event,ip) => {
        require(path.join(__dirname,'src/scripts/websocket.js')).init(ip,window)
    })
})

elec.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') elec.app.quit()
})