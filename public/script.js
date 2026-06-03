
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

let running = false;
let multiplier = 1;
let progress = 0;
let crashPoint = 0;
let interval;

// UPDATE BALANCE
function updateBalance() {
    balanceBox.innerText = "Balance: $" + balance.toFixed(2);
}

updateBalance();

// START GAME
function startRound() {

    running = true;
    multiplier = 1;
    progress = 0;

    crashPoint = (Math.random() * 8 + 1).toFixed(2);

    statusBox.innerText = "Flying...";

    path.style.width = "0%";

    interval = setInterval(() => {

        multiplier += multiplier * 0.02;
        progress += 0.8;

        display.innerText = multiplier.toFixed(2) + "x";

        path.style.width = Math.min(progress, 100) + "%";

        // 🚀 FIXED AVIATOR CAMERA MOVEMENT
        let x = Math.min(progress, 95);
        let y = Math.min(progress * 1.2, 90);

        rocket.style.transform = `translate(${x}%, -${y}%)`;

        if (multiplier >= crashPoint || progress >= 100) {
            crash();
        }

    }, 100);
}

// BET
betBtn.onclick = () => {

    bet = parseFloat(betInput.value);

    if (!bet || bet <= 0 || bet > balance) return;

    balance -= bet;
    updateBalance();

    statusBox.innerText = "Bet placed: $" + bet;

    if (!running) startRound();
};

// CASH OUT
cashBtn.onclick = () => {

    if (!running || bet <= 0) return;

    let win = bet * multiplier;
    balance += win;

    updateBalance();

    statusBox.innerText =
        "CASHED OUT " + multiplier.toFixed(2) + "x +" + win.toFixed(2);

    bet = 0;
};

// CRASH
function crash() {

    clearInterval(interval);
    running = false;

    statusBox.innerText =
        "CRASH " + multiplier.toFixed(2) + "x";

    bet = 0;

    setTimeout(startRound, 2500);
}
