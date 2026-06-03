
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// ================= SOCKET.IO (RENDER SAFE) =================
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// ================= GAME STATE =================
let multiplier = 1;
let progress = 0;
let crashPoint = 0;
let running = false;

// ================= START GAME LOOP =================
function startRound() {

    multiplier = 1;
    progress = 0;
    crashPoint = (Math.random() * 8 + 1);

    running = true;

    io.emit("round_start");

    const interval = setInterval(() => {

        multiplier += multiplier * 0.02;
        progress += 1;

        io.emit("update", {
            multiplier: multiplier.toFixed(2),
            progress: progress
        });

        if (multiplier >= crashPoint || progress >= 100) {

            clearInterval(interval);
            running = false;

            io.emit("crash", {
                multiplier: multiplier.toFixed(2)
            });

            setTimeout(startRound, 5000); // 5 sec loop
        }

    }, 100);
}

// ================= SOCKET CONNECTION =================
io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("bet", (data) => {
        console.log("Bet received:", data);
    });

    socket.on("cashout", (data) => {
        console.log("Cashout:", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// ================= RENDER SAFE PORT =================
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server running on port", PORT);
    startRound();
});
