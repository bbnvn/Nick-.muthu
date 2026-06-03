
const display = document.querySelector(".multiplier");
const rocket = document.getElementById("rocket");
const path = document.getElementById("path");
const statusBox = document.getElementById("status");
const balanceBox = document.getElementById("balance");

const betInput = document.getElementById("betInput");
const betBtn = document.getElementById("betBtn");
const cashBtn = document.getElementById("cashBtn");

// ================= STATE =================
let balance = 1000;
let bet = 0;
let lastMultiplier = 1;

// ================= SOCKET.IO CONNECT =================
// ⚠️ REPLACE THIS WITH YOUR REAL RENDER URL
const socket = io("https://YOUR-RENDER-URL.onrender.com", {
    transports: ["websocket"]
});

// ================= CONNECTION STATUS =================
socket.on("connect", () => {
    statusBox.innerText = "Connected ✔";
});

socket.on("disconnect", () => {
    statusBox.innerText = "Disconnected ❌";
});

// ================= GAME EVENTS =================
socket.on("round_start", () => {

    statusBox.innerText = "Round Started";

    display.innerText = "1.00x";

    path.style.width = "0%";
    rocket.style.transform = "translate(0%, 0%)";
});

socket.on("update", (data) => {

    display.innerText = data.multiplier + "x";

    let progress = data.progress;

    path.style.width = Math.min(progress, 100) + "%";

    // 🚀 KEEP ROCKET INSIDE FRAME (IMPORTANT FIX)
    let x = Math.min(progress, 95);
    let y = Math.min(progress * 1.2, 90);

    rocket.style.transform = `translate(${x}%, -${y}%)`;

    lastMultiplier = parseFloat(data.multiplier);
});

socket.on("crash", (data) => {

    statusBox.innerText = "CRASH " + data.multiplier + "x";

    bet = 0;
});

// ================= BET =================
betBtn.onclick = () => {

    bet = parseFloat(betInput.value);

    if (!bet || bet <= 0 || bet > balance) {
        alert("Invalid bet");
        return;
    }

    balance -= bet;
    balanceBox.innerText = "Balance: $" + balance.toFixed(2);

    socket.emit("bet", {
        amount: bet
    });

    statusBox.innerText = "Bet placed: $" + bet;
};

// ================= CASH OUT =================
cashBtn.onclick = () => {

    if (!bet) return;

    let win = bet * lastMultiplier;

    balance += win;

    balanceBox.innerText = "Balance: $" + balance.toFixed(2);

    socket.emit("cashout", {
        amount: bet,
        multiplier: lastMultiplier
    });

    statusBox.innerText =
        "CASHED OUT " + lastMultiplier.toFixed(2) + "x";

    bet = 0;
};
