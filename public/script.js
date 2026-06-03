const display = document.querySelector(".multiplier");
const rocket = document.getElementById("rocket");
const path = document.getElementById("path");
const statusBox = document.getElementById("status");

let multiplier = 1;
let progress = 0;
let running = true;

// Status
statusBox.innerText = "Local Mode Active";

// Start game loop
function startRound() {

    multiplier = 1;
    progress = 0;

    path.style.width = "0%";
    rocket.style.left = "0%";
    rocket.style.bottom = "0px";

    const crashPoint = (Math.random() * 8 + 1).toFixed(2);

    const interval = setInterval(() => {

        multiplier += multiplier * 0.02;
        progress += 0.8;

        display.innerText = multiplier.toFixed(2) + "x";

        path.style.width = progress + "%";
        rocket.style.left = progress + "%";
        rocket.style.bottom = (progress * 1.5) + "px";

        if (multiplier >= crashPoint || progress >= 100) {

            clearInterval(interval);

            display.innerText =
                "💥 CRASH " +
                multiplier.toFixed(2) +
                "x";

            statusBox.innerText = "Round Crashed";

            setTimeout(() => {
                statusBox.innerText = "New Round";
                startRound();
            }, 3000);
        }

    }, 100);
}

startRound();
