
const display = document.querySelector(".multiplier");
const rocket = document.getElementById("rocket");
const path = document.getElementById("path");
const statusBox = document.getElementById("status");

// ===== AUDIO =====
const cashSound = new Audio("cashout.mp3");
const crashSound = new Audio("crash.mp3");
const betSound = new Audio("bet.mp3");

// ===== GAME STATE =====
let balance = 1000;
let bet = 0;
let autoBet = false;
let running = false;

let multiplier = 1;
let progress = 0;
let crashPoint = 0;
let interval;

// ===== UI (you must have these inputs/buttons in HTML) =====
const betInput = document.createElement("input");
betInput.placeholder = "Enter bet";
betInput.type = "number";
document.body.appendChild(betInput);

const betBtn = document.createElement("button");
betBtn.innerText = "BET";
document.body.appendChild(betBtn);

const cashBtn = document.createElement("button");
cashBtn.innerText = "CASH OUT";
document.body.appendChild(cashBtn);

const autoBtn = document.createElement("button");
autoBtn.innerText = "AUTO BET: OFF";
document.body.appendChild(autoBtn);

// ===== LIVE PLAYERS (FAKE) =====
const playersBox = document.createElement("div");
playersBox.innerHTML = "LIVE PLAYERS: 12";
document.body.appendChild(playersBox);

setInterval(() => {
    let fakePlayers = Math.floor(Math.random() * 20 + 5);
    playersBox.innerHTML = "LIVE PLAYERS: " + fakePlayers;
}, 3000);

// ===== START ROUND =====
function startRound() {

    running = true;
    multiplier = 1;
    progress = 0;

    crashPoint = (Math.random() * 8 + 1).toFixed(2);

    statusBox.innerText = "Round Started";

    path.style.width = "0%";
    rocket.style.left = "0%";
    rocket.style.bottom = "0px";

    interval = setInterval(() => {

        multiplier += multiplier * 0.02;
        progress += 0.8;

        display.innerText = multiplier.toFixed(2) + "x";

        path.style.width = progress + "%";
        rocket.style.left = progress + "%";
        rocket.style.bottom = (progress * 1.5) + "px";

        // AUTO CASHOUT (simple logic)
        if (autoBet && multiplier >= 2.0) {
            cashOut();
        }

        if (multiplier >= crashPoint || progress >= 100) {
            crash();
        }

    }, 100);
}

// ===== BET =====
betBtn.onclick = () => {

    bet = parseFloat(betInput.value);

    if (!bet || bet <= 0 || bet > balance) {
        alert("Invalid bet");
        return;
    }

    betSound.play();

    balance -= bet;
    statusBox.innerText = "Bet Placed: $" + bet;

    if (!running) {
        startRound();
    }
};

// ===== CASH OUT =====
function cashOut() {

    if (!running || bet <= 0) return;

    cashSound.play();

    let winnings = bet * multiplier;
    balance += winnings;

    statusBox.innerText =
        "CASHED OUT at " +
        multiplier.toFixed(2) +
        "x +" +
        winnings.toFixed(2);

    bet = 0;
}

// ===== CRASH =====
function crash() {

    clearInterval(interval);
    running = false;

    crashSound.play();

    statusBox.innerText =
        "CRASHED at " +
        multiplier.toFixed(2) +
        "x";

    bet = 0;

    setTimeout(startRound, 3000);
}

// ===== AUTO BET =====
autoBtn.onclick = () => {

    autoBet = !autoBet;

    autoBtn.innerText =
        "AUTO BET: " + (autoBet ? "ON" : "OFF");
};
