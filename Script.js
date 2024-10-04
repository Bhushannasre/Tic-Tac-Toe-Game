let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let gameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");

let turnO = true;
let gameOver = false;
let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Resets the game
const resetGame = () => {
    turnO = true;
    gameOver = false;
    enableBoxes();
    msg.innerText = "It's O's turn!";
};

// Shows the winner message and disables further moves
const showWinner = (winner) => {
    msg.innerText = `Congratulations, The Winner is ${winner}`;
    disableBoxes();
    gameOver = true;
};

// Disables all the boxes (no further moves allowed)
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Enables the boxes and clears them for a new game
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Checks for the winner after each move
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }

    // Check for a draw
    if ([...boxes].every((box) => box.innerText !== "")) {
        msg.innerText = "It's a Draw!";
        disableBoxes();
        gameOver = true;
    }
};

// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return;

        if (turnO) {
            box.innerText = "O";
            msg.innerText = "It's X's turn!";
        } else {
            box.innerText = "X";
            msg.innerText = "It's O's turn!";
        }

        box.disabled = true;
        turnO = !turnO;
        checkWinner();
    });
});

// // Event listener for the reset button
// resetBtn.addEventListener("click", resetGame);

// Event listener for the new game button (same functionality as reset)
gameBtn.addEventListener("click", resetGame);

// Initialize game with a reset
resetGame();
