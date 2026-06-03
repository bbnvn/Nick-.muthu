
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Socket.IO server
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// ================= GAME STATE =================
let multiplier = 1;
let progress = 0;
let crashPoint = 0;
let running = false;

let bets = {}; // store player bets

// ================= START ROUND =================
function startRound() {

    multiplier = 1;
    progress = 0;
    crashPoint = (Math.random() * 8 + 1); // 1x - 9x

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

            // reset bets after crash
            bets = {};

            setTimeout(startRound, 5000); // 5 sec loop
        }

    }, 100);
}

// ================= SOCKET CONNECTION =================
io.on("connection", (socket) => {

    console.log("Player connected:", socket.id);

    // BET
    socket.on("bet", (data) => {
        bets[socket.id] = {
            amount: data.amount,
            cashed: false
        };
        console.log("Bet:", socket.id, data.amount);
    });

    // CASHOUT
    socket.on("cashout", (data) => {

        let player = bets[socket.id];

        if (!player || player.cashed) return;

        player.cashed = true;

        let payout = player.amount * data.multiplier;

        socket.emit("payout", {
            amount: payout
        });

        console.log("Cashout:", socket.id, payout);
    });

    socket.on("disconnect", () => {
        delete bets[socket.id];
        console.log("Player left:", socket.id);
    });
});

// ================= START SERVER =================
server.listen(3000, () => {
    console.log("Server running on port 3000");
    startRound();
});
