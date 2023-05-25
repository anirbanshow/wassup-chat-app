const socket = io();

let name;

let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");

do {
    name = prompt("Please enter a name: ");
} while (!name);


textarea.addEventListener('keyup', (e) => {

    if (e.key == 'Enter') {
        sendMessage(e.target.value);
    }

});


function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    // Append the message
    appendMessage(msg, 'outgoing');
    textarea.value = "";
    scrollToBottom();

    // Send to Server
    socket.emit('message', msg);
}

function appendMessage(msg, type) {

    let maindiv = document.createElement('div');
    let classNAme = type;

    maindiv.classList.add(classNAme, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    maindiv.innerHTML = markup;

    messageArea.appendChild(maindiv);
}

// Receive message

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    textarea.value = "";
    scrollToBottom();
});


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}