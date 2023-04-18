// Advanced createElement script
function createElement(element,attribute,inner){if(element==undefined){return false};if(inner==undefined){inner=""};var el=document.createElement(element);if(typeof(attribute)==='object'){for(var key in attribute){el.setAttribute(key, attribute[key])}};if(!Array.isArray(inner)){inner=[inner]};for(var k=0;k<inner.length;k++){if(inner[k].tagName){el.appendChild(inner[k])}else{el.appendChild(document.createTextNode(inner[k]))}}return el}

const body = document.body
console.log('HELLO WORLD BLYAT')
let video = document.createElement('video')

const showvideobutton = document.createElement('button')
showvideobutton.type = "button"
showvideobutton.innerText = "Show"
body.appendChild(showvideobutton)
body.appendChild(document.createElement('br'))
// body.appendChild(video)

const inputbox = document.createElement('input')
body.appendChild(inputbox)

const a = createElement("a",{"href":"https://google.com/search?q=Жёсткое гей-порно"},"Прикол");
document.body.appendChild(a)

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
    const p = document.createElement('p')
    p.innerText = '[Server] ' + msg
    p.id = "wsMsg"
    body.appendChild(p)
})