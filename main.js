const elec = require('electron')
//require('update-electron-app')()
const path = require('path')

elec.app.setName('ShitCord')
elec.app.whenReady().then(() => {
    const window = new elec.BrowserWindow({
        width: 800,
        height: 600,
        icon: './app.ico',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        titleBarStyle: 'hidden'
        
    })
    window.loadFile('index.html')
    window.maximize()
    elec.desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
        for (const source of sources) {
            return window.webContents.send('SET_SOURCE', source.id)
        }
    })
})

elec.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') elec.app.quit()
})