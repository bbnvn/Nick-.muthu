
let multiplier = 1;
let crashPoint = 0;
let running = false;
let interval = null;

// ---------------- CRASH POINT ----------------
function generateCrash() {
  const r = Math.random();

  if (r < 0.5) return (Math.random() * 1.5 + 1.2);
  if (r < 0.8) return (Math.random() * 3 + 1.5);
  if (r < 0.95) return (Math.random() * 6 + 3);
  return (Math.random() * 12 + 8);
}

// ---------------- START GAME ----------------
function startGame() {
  if (running) return;

  running = true;
  multiplier = 1;
  crashPoint = generateCrash().toFixed(2);

  interval = setInterval(() => {
    multiplier += 0.02;

    document.getElementById("multiplier").innerText =
      multiplier.toFixed(2) + "x";

    // send to server (for Render logs)
    fetch("/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        multiplier: multiplier.toFixed(2),
        crashPoint,
        state: "running"
      })
    });

    if (multiplier >= crashPoint) {
      crashGame();
    }

  }, 100);
}

// ---------------- CASH OUT ----------------
function cashOut() {
  if (!running) return;

  alert("Cashed out at " + multiplier.toFixed(2) + "x");
  stopGame();
}

// ---------------- CRASH ----------------
function crashGame() {
  clearInterval(interval);
  running = false;

  document.getElementById("multiplier").innerText =
    "CRASHED at " + crashPoint + "x";

  fetch("/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      multiplier,
      crashPoint,
      state: "crashed"
    })
  });
}

// ---------------- STOP ----------------
function stopGame() {
  clearInterval(interval);
  running = false;
}