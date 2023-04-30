// Advanced createElement script
function createElement(element,attribute,inner){if(element==undefined){return false};if(inner==undefined){inner=""};var el=document.createElement(element);if(typeof(attribute)==='object'){for(var key in attribute){el.setAttribute(key, attribute[key])}};if(!Array.isArray(inner)){inner=[inner]};for(var k=0;k<inner.length;k++){if(inner[k].tagName){el.appendChild(inner[k])}else{el.appendChild(document.createTextNode(inner[k]))}}return el}

const body = document.body

const inputbox = document.getElementById('wsMsgInput')
const showvideobutton = document.getElementById('toggleStreamBtn')
const video = document.getElementById('stream')
const wsMsgBox = document.getElementById('wsMsgBox')
const initMsg = document.getElementById('initMsg')

// Event listeners

// WebSocket Message InputBox on Enter event.
inputbox.addEventListener('keypress', (event) => {
    if (event.key === "Enter" && inputbox.value.replace(/\s/g, '') != "") {
        window.ws.send(inputbox.value)
        inputbox.value = ""
    }
})

// Video Show/Hide button event.
showvideobutton.onclick = () => {
    if (showvideobutton.innerText == "Show") {
        video.hidden = false
        showvideobutton.innerText = "Hide"
    } else {
        video.hidden = true
        showvideobutton.innerText = "Show"
    }
}

// On incoming message from WebSocket
window.ws.onMsg((event, msg) => {
    if(initMsg){wsMsgBox.removeChild(initMsg);delete initMsg}
    const p = createElement('p',{'id':'wsMsg'},msg)
    body.appendChild(p)
})