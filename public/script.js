
/* ===== LAYOUT ===== */
body {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* GAME BOX CENTER */
.game-box {
    width: 90%;
    max-width: 800px;
}

/* ===== MULTIPLIER ===== */
.multiplier {
    font-size: 80px;
    color: #00ff99;
    text-align: center;
    margin: 20px 0;
}

/* ===== GRAPH AREA ===== */
.graph {
    position: relative;
    height: 250px;
    border-radius: 15px;
    border: 2px solid rgba(0,255,150,0.2);
    background: rgba(0,0,0,0.4);
    overflow: hidden;
}

/* ===== LEFT BET PANEL (AVIATOR STYLE) ===== */
.bet-panel {
    position: absolute;
    left: 10px;
    bottom: 20px;
    width: 200px;
    padding: 15px;
    background: rgba(0, 255, 150, 0.08);
    border: 1px solid rgba(0,255,150,0.3);
    border-radius: 12px;
    backdrop-filter: blur(10px);
}

/* BET INPUT */
.bet-panel input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border-radius: 8px;
    border: none;
    outline: none;
}

/* BET BUTTON */
.bet-panel button {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: none;
    border-radius: 8px;
    background: #00ff99;
    color: black;
    font-weight: bold;
    cursor: pointer;
}

/* ===== RIGHT CASHOUT PANEL ===== */
.cash-panel {
    position: absolute;
    right: 10px;
    bottom: 20px;
    width: 200px;
    padding: 15px;
    background: rgba(255, 0, 60, 0.08);
    border: 1px solid rgba(255,0,60,0.3);
    border-radius: 12px;
    backdrop-filter: blur(10px);
}

/* CASHOUT BUTTON */
.cash-panel button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #ff0033;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

/* HOVER EFFECTS */
.bet-panel button:hover,
.cash-panel button:hover {
    transform: scale(1.05);
}
