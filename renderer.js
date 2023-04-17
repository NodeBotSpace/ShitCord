const body = document.body
console.log('HELLO WORLD BLYAT')
let video = document.createElement('video')
video.controls=true
video.muted=true
video.width=1280
video.hidden = true

const showvideobutton = document.createElement('button')
showvideobutton.type="button"
showvideobutton.innerText="Show"
showvideobutton.onclick=()=>{
    if(showvideobutton.innerText=="Show"){
        video.hidden=false
        showvideobutton.innerText="Hide"
    }else{
        video.hidden=true
        showvideobutton.innerText="Show"
    }
}
body.appendChild(showvideobutton)
body.appendChild(document.createElement('br'))
body.appendChild(video)

const channels = document.createElement('div')
channels.id = 'server-channels'
body.appendChild(channels)

const inputbutton = document.createElement('button')
inputbutton.type="button"
inputbutton.id="wsSendButton"
inputbutton.innerText="Send"
const inputbox = document.createElement('input')
inputbox.id="wsInput"
inputbutton.onclick = () =>{
    console.log('MEOW',inputbox.value)
    window.ws.send(inputbox.value)
    inputbox.value=""
}

body.appendChild(inputbox)
body.appendChild(inputbutton)