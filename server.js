const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// optional: log game data from browser
app.post("/update", (req, res) => {
  console.log("GAME UPDATE:");
  console.log("Multiplier:", req.body.multiplier);
  console.log("Crash:", req.body.crashPoint);
  console.log("State:", req.body.state);
  console.log("---------------------------");

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});