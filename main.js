const form = document.querySelector(".form");
const game = document.querySelector(".game");
const change = document.querySelector("#change");
const replay = document.querySelector("#replay");
const gameGrid = document.querySelector(".grid");
const gameBlocks = document.querySelectorAll(".block");
const values = form.elements;
const result = document.querySelector(".result");

let turn = 0;
let mode;
let i = 0;
let j = 0;
let gameOver = false;
let players;
let winValue = "";
let p1score = 0;
let p2score = 0;
let p1Value;
let version;
const valueGrid = ["", "", "", "", "", "", "", "", ""];
let moves = ["cross", "naught"];

function checkGame() {
    for (i = 0; i < 3; i++) {
        if (
            valueGrid[i] === valueGrid[i + 3] &&
            valueGrid[i] === valueGrid[i + 6] &&
            valueGrid[i]
        ) {
            gameOver = true;
            winValue = valueGrid[i];
            return;
        }
    }

    for (i = 0; i < 7; i += 3) {
        if (
            valueGrid[i] === valueGrid[i + 1] &&
            valueGrid[i] === valueGrid[i + 2] &&
            valueGrid[i]
        ) {
            gameOver = true;
            winValue = valueGrid[i];
            return;
        }
    }

    if (
        valueGrid[4] === valueGrid[0] &&
        valueGrid[4] === valueGrid[8] &&
        valueGrid[4]
    ) {
        gameOver = true;
        winValue = valueGrid[4];
        return;
    }

    if (
        valueGrid[4] === valueGrid[2] &&
        valueGrid[4] === valueGrid[6] &&
        valueGrid[4]
    ) {
        gameOver = true;
        winValue = valueGrid[4];
        return;
    }
}

function resetGame() {
    for (i = 0; i < 9; i++) {
        gameBlocks[i].classList.remove("cross");
        gameBlocks[i].classList.remove("naught");
        valueGrid[i] = "";
    }
    turn = 0;
    gameOver = false;
    winValue = "";
    result.innerText = "";
}

function reset() {
    p1score = 0;
    p2score = 0;
    document.querySelector("#player-one-score").innerText = p1score;
    document.querySelector("#player-two-score").innerText = p2score;
}

function gameIncrement() {
    if (winValue) {
        if (winValue === p1Value) {
            p1score++;
            document.querySelector("#player-one-score").innerText = p1score;
            result.innerText = `${values["player-one"].value} Wins`;
        } else {
            p2score++;
            document.querySelector("#player-two-score").innerText = p2score;
            result.innerText = `${values["player-two"].value} Wins`;
        }
    } else result.innerText = "Draw";
}

function playGame() {
    if (mode === "two") return;
    else {
        if (p1Value === "naught") playMove();
    }
}

function playMove() {
    //code to play move
    let move;
    if (turn === 0) move = 0;
    else move = calcMove();
    gameBlocks[move].classList.add(moves[turn % 2]);
    valueGrid[move] = moves[turn % 2];
    moveOver();
}

function calcMove() {
    const moveValues = [1, 0, 1, 0, 2, 0, 1, 0, 1];
    let count1;
    let count2;
    let pos = 0;

    if (turn === 2) {
        if (valueGrid[3] || valueGrid[6] || valueGrid[7] || valueGrid[8]) {
            version = 1;
            return 2;
        }
        if (valueGrid[1] || valueGrid[2] || valueGrid[5]) {
            version = 2;
            return 3;
        }
    }

    if (turn === 3) {
        if (
            (valueGrid[0] === p1Value && valueGrid[8] === p1Value) ||
            (valueGrid[2] === p1Value && valueGrid[6] === p1Value)
        )
            return 1;
    }

    if (turn === 4) {
        if (version === 1) {
            if (valueGrid[4] || valueGrid[7]) {
                return 4;
            }

            if (valueGrid[6]) {
                return 8;
            }

            if (valueGrid[8]) {
                return 6;
            }
        }

        if (version === 2) {
            if (valueGrid[1] || valueGrid[5]) {
                return 4;
            }

            if (valueGrid[2]) {
                return 8;
            }
        }
    }

    for (i = 0; i < 3; i++) {
        count1 = 0;
        count2 = 0;
        for (j = i; j < 9; j += 3) {
            if (valueGrid[j])
                if (valueGrid[j] === p1Value) count1++;
                else count2++;
        }
        if (count1 == 2)
            for (j = i; j < 9; j += 3) {
                if (!valueGrid[j]) moveValues[j] += 5;
            }
        if (count2 == 2)
            for (j = i; j < 9; j += 3) {
                if (!valueGrid[j]) moveValues[j] += 50;
            }
    }

    for (i = 0; i < 9; i += 3) {
        count1 = 0;
        count2 = 0;
        for (j = i; j < i + 3; j++) {
            if (valueGrid[j])
                if (valueGrid[j] === p1Value) count1++;
                else count2++;
        }
        if (count1 == 2)
            for (j = i; j < i + 3; j++) {
                if (!valueGrid[j]) moveValues[j] += 5;
            }
        if (count2 == 2)
            for (j = i; j < i + 3; j++) {
                if (!valueGrid[j]) moveValues[j] += 50;
            }
    }

    count1 = 0;
    count2 = 0;

    for (i = 0; i < 9; i += 4) {
        if (valueGrid[i])
            if (valueGrid[i] === p1Value) count1++;
            else count2++;
    }

    if (count1 == 2)
        for (i = 0; i < 9; i += 4) {
            if (!valueGrid[i]) moveValues[j] += 5;
        }
    if (count2 == 2)
        for (i = 0; i < 9; i += 4) {
            if (!valueGrid[i]) moveValues[j] += 50;
        }

    count1 = 0;
    count2 = 0;

    for (i = 2; i < 7; i += 2) {
        if (valueGrid[i])
            if (valueGrid[i] === p1Value) count1++;
            else count2++;
    }

    if (count1 == 2)
        for (i = 2; i < 7; i += 2) {
            if (!valueGrid[i]) moveValues[j] += 5;
        }
    if (count2 == 2)
        for (i = 2; i < 7; i += 2) {
            if (!valueGrid[i]) moveValues[j] += 50;
        }

    for (i = 0; i < 9; i++) {
        if (valueGrid[i]) moveValues[i] = 0;
    }

    for (i = 0; i < 9; i++) {
        if (moveValues[i] >= moveValues[pos]) pos = i;
    }

    return pos;
}

function moveOver() {
    checkGame();
    turn++;
    if (turn === 9) gameOver = true;
    if (gameOver) {
        gameIncrement();
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    p1Value = values.token.value;
    document.querySelector("#player-one-name").innerText =
        values["player-one"].value;
    document.querySelector("#player-two-name").innerText =
        values["player-two"].value;
    mode = values.mode.value;
    game.classList.toggle("hidden");
    form.classList.toggle("hidden");
    resetGame();
    reset();
    playGame();
});

change.addEventListener("click", () => {
    game.classList.toggle("hidden");
    form.classList.toggle("hidden");
});

i = 0;
for (let block of gameBlocks) {
    block.gameValue = i;
    block.addEventListener("click", () => {
        if (block.classList.length === 1 && !gameOver) {
            block.classList.add(moves[turn % 2]);
            valueGrid[block.gameValue] = moves[turn % 2];
            moveOver();
            if (mode === "one" && !gameOver) playMove();
        }
    });
    i++;
}

replay.addEventListener("click", () => {
    resetGame();
    playGame();
});
