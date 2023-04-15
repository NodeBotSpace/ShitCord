const body = document.body
console.log('HELLO WORLD BLYAT')
let video = document.createElement('video')
video.src="video/mp4"
video.controls=true
video.muted=true
video.width=1280
body.appendChild(video)

const channels = document.createElement('div')
channels.id = 'server-channels'
body.appendChild(channels)
