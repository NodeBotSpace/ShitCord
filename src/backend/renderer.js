// Local useful functions
function createElement(element,attribute,inner){if(element==undefined){return false};if(inner==undefined){inner=""};var el=document.createElement(element);if(typeof(attribute)==='object'){for(var key in attribute){el.setAttribute(key, attribute[key])}};if(!Array.isArray(inner)){inner=[inner]};for(var k=0;k<inner.length;k++){if(inner[k].tagName){el.appendChild(inner[k])}else{el.appendChild(document.createTextNode(inner[k]))}}return el}

const body = document.body

// Event listeners

// Video Show/Hide button event.
const showvideobutton = document.getElementById('toggleStreamBtn')
const video = document.getElementById('stream')
showvideobutton.onclick = () => {
    if (showvideobutton.innerText == "Show") {
        video.hidden = false
        showvideobutton.innerText = "Hide"
    } else {
        video.hidden = true
        showvideobutton.innerText = "Show"
    }
}

// WebSocket Message InputBox on Enter event.
const wsMsgInput = document.getElementById('wsMsgInput')
wsMsgInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter" && wsMsgInput.value.replace(/\s/g, '') != "") {
        window.ws.send(wsMsgInput.value)
        wsMsgInput.value = ""
    }
})

// WebSocket Messages
const wsMsgBox = document.getElementById('wsMsgBox')
window.ws.onMsg((event, msg) => {
    const p = createElement('p',{'id':'wsMsg'},msg)
    wsMsgBox.appendChild(p)
})

// Connect to WebSocket
const wsIp = document.getElementById('wsIp')
const wsConnectBtn = document.getElementById('wsConnectBtn')
wsConnectBtn.onclick=()=>{
    console.log('click')
    console.log(wsIp.value,typeof(wsIp.value))
    let ip = wsIp.value
    if(ip.replace(/\s/g,'')=='') ip="ws://localhost:8080"
    window.ws.connect(ip,(event,out)=>{
        console.log('wsConnection:',out.data)
        if(out.status==true){
            document.getElementById('init').hidden=true
            // document.getElementById('testStream').hidden=false
            document.getElementById('wsChat').hidden=false
        }
    })
}