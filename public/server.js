let multiplier = 1;
let interval = null;
let running = false;

let crashPoint = 0;
let cashedOut = false;

// Generate a realistic crash point (skewed probability)
function generateCrashPoint() {
  // Most crashes between 1.2x and 5x, rare high multipliers
  const r = Math.random();

  if (r < 0.5) return (Math.random() * 1.5 + 1.0);      // 1.0x - 2.5x
  if (r < 0.8) return (Math.random() * 3 + 1.5);        // 1.5x - 4.5x
  if (r < 0.95) return (Math.random() * 5 + 3);         // 3x - 8x
  return (Math.random() * 20 + 8);                      // rare big runs
}

// Start round
function startGame() {
  if (running) return;

  running = true;
  cashedOut = false;
  multiplier = 1;

  crashPoint = generateCrashPoint().toFixed(2);

  const display = document.getElementById("multiplier");
  display.innerText = "1.00x";

  interval = setInterval(() => {
    multiplier += 0.02;

    // check crash
    if (multiplier >= crashPoint) {
      crashGame();
      return;
    }

    display.innerText = multiplier.toFixed(2) + "x";
  }, 100);
}

// Cash out before crash
function cashOut() {
  if (!running || cashedOut) return;

  cashedOut = true;

  alert("You cashed out at " + multiplier.toFixed(2) + "x");

  stopGame();
}

// Crash event
function crashGame() {
  clearInterval(interval);
  interval = null;
  running = false;

  const display = document.getElementById("multiplier");

  display.innerText = "CRASHED at " + crashPoint + "x";
}

// Stop round safely
function stopGame() {
  clearInterval(interval);
  interval = null;
  running = false;
}const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});