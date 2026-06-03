
const display = document.querySelector(".multiplier");
const rocket = document.getElementById("rocket");
const path = document.getElementById("path");
const statusBox = document.getElementById("status");

const betInput = document.getElementById("betInput");
const betBtn = document.getElementById("betBtn");
const cashBtn = document.getElementById("cashBtn");

// ===== GAME STATE =====
let balance = 1000;
let bet = 0;
let running = false;

let multiplier = 1;
let progress = 0;
let crashPoint = 0;
let interval;

// ===== START ROUND =====
function startRound() {

    running = true;
    multiplier = 1;
    progress = 0;

    crashPoint = (Math.random() * 8 + 1).toFixed(2);

    statusBox.innerText = "Flying...";

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

    balance -= bet;
    statusBox.innerText = "Bet placed: $" + bet;

    if (!running) {
        startRound();
    }
};

// ===== CASH OUT =====
cashBtn.onclick = () => {

    if (!running || bet <= 0) return;

    let winnings = bet * multiplier;
    balance += winnings;

    statusBox.innerText =
        "CASHED OUT at " +
        multiplier.toFixed(2) +
        "x +" +
        winnings.toFixed(2);

    bet = 0;
};

// ===== CRASH =====
function crash() {

    clearInterval(interval);
    running = false;

    statusBox.innerText =
        "CRASHED at " +
        multiplier.toFixed(2) +
        "x";

    bet = 0;

    setTimeout(startRound, 3000);
}
