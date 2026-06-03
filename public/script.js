const display = document.querySelector(".multiplier");
const rocket = document.getElementById("rocket");
const path = document.getElementById("path");
const statusBox = document.getElementById("status");

let progress = 0;

/*
Example:

const socket = new WebSocket(
    "wss://your-render-server.onrender.com"
);

For local testing:
ws://localhost:8080
*/

const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
    statusBox.innerText = "Connected";
};

socket.onerror = () => {
    statusBox.innerText = "Connection Error";
};

socket.onclose = () => {
    statusBox.innerText = "Disconnected";
};

socket.onmessage = (event) => {

    const data = JSON.parse(event.data);

    if(data.type === "round_start"){
        progress = 0;
        path.style.width = "0%";
        rocket.style.left = "0%";
        rocket.style.bottom = "0px";

        statusBox.innerText = "Round Started";
    }

    if(data.type === "update"){

        display.innerText = data.multiplier + "x";

        progress = data.progress;

        path.style.width = progress + "%";

        rocket.style.left = progress + "%";

        rocket.style.bottom =
            (progress * 1.5) + "px";
    }

    if(data.type === "crash"){

        display.innerText =
            "💥 CRASH " +
            data.multiplier +
            "x";

        statusBox.innerText = "Round Crashed";
    }
};
