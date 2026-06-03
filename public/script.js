
const display = document.querySelector(".multiplier");
const rocket = document.getElementById("rocket");
const path = document.getElementById("path");
const statusBox = document.getElementById("status");
const balanceBox = document.getElementById("balance");

const betInput = document.getElementById("betInput");
const betBtn = document.getElementById("betBtn");
const cashBtn = document.getElementById("cashBtn");

let balance = 1000;
let bet = 0;

// ============================
// CONNECT TO RENDER SERVER
// ============================
// IMPORTANT: replace this after deploy
const socket = io("https://YOUR-RENDER-URL.onrender.com");

let lastMultiplier = 1;

// ============================
// SOCKET EVENTS (REAL GAME)
// ============================

socket.on("connect", () => {
    statusBox.innerText = "Connected to server";
});

socket.on("round_start", () => {

    statusBox.innerText = "Round Started";

    path.style.width = "0%";
    rocket.style.transform = "translate(0%, 0%)";

    lastMultiplier = 1;
});

socket.on("update", (data) => {

    display.innerText = data.multiplier + "x";

    let progress = data.progress;

    path.style.width = Math.min(progress, 100) + "%";

    // KEEP ROCKET INSIDE FRAME (CAMERA FIX)
    let x = Math.min(progress, 95);
    let y = Math.min(progress * 1.2, 90);

    rocket.style.transform = `translate(${x}%, -${y}%)`;

    lastMultiplier = parseFloat(data.multiplier);
});

socket.on("crash", (data) => {

    statusBox.innerText = "CRASH " + data.multiplier + "x";

    // reset bet on crash
    bet = 0;
});

// ============================
// BET SYSTEM (CLIENT SIDE ONLY)
// ============================

betBtn.onclick = () => {

    bet = parseFloat(betInput.value);

    if (!bet || bet <= 0 || bet > balance) {
        alert("Invalid bet");
        return;
    }

    balance -= bet;
    balanceBox.innerText = "Balance: $" + balance.toFixed(2);

    statusBox.innerText = "Bet placed: $" + bet;

    // send to server
    socket.emit("bet", { amount: bet });
};

// ============================
// CASH OUT
// ============================

cashBtn.onclick = () => {

    if (!bet) return;

    let win = bet * lastMultiplier;

    balance += win;

    balanceBox.innerText = "Balance: $" + balance.toFixed(2);

    statusBox.innerText =
        "CASHED OUT at " +
        lastMultiplier.toFixed(2) +
        "x +" +
        win.toFixed(2);

    socket.emit("cashout", {
        amount: bet,
        multiplier: lastMultiplier
    });

    bet = 0;
};
