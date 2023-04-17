const elec = require('electron')

elec.ipcRenderer.on('SET_SOURCE', async (event, sourceId) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: 'desktop'
        }
      },
      video: {
        mandatory: {
          chromeMediaSource: 'desktop'
        }
      }
    })
    handleStream(stream)
  } catch (e) {
    handleError(e)
  }
})

function handleStream(stream) {
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
}

function handleError(e) {
  console.log(e)
}

// elec.ipcRenderer.addListener('wsMsg', msg => {
//   console.log()
//   let p = document.createElement('p')
//   p.innerHTML = msg
//   document.body.appendChild(p)
// })

elec.contextBridge.exposeInMainWorld('ws', {
  send: (msg) => {elec.ipcRenderer.send('wsMsgSend',msg);console.log('PRELOAD MEOW')}
})