const blocks = document.querySelectorAll(".block"); //All blocks
const currentPlayerSpan = document.querySelector(".turn.player"); //Current player span
const newGameButton = document.querySelector(".new-game");
const turnText = document.querySelector(".turn.text");
//Containers for animation
const playerOneContainer = document.querySelector(".player-one.container");
const playerTwoContainer = document.querySelector(".player-two.container");
//Names
const playerOneName = document.querySelector(".player-one.name");
const playerTwoName = document.querySelector(".player-two.name");
//Score
const playerOneScore = document.querySelector(".player-one.score");
const playerTwoScore = document.querySelector(".player-two.score");
//form
const formContainer = document.querySelector(".form");
const playerOneInput = document.querySelector(".player-one-input");
const playerTwoInput = document.querySelector(".player-two-input");
const startBtn = document.querySelector(".start.btn");
const AiCheckbox = document.querySelector(".AI.checkbox");

let pcPlayer = new Boolean(false);
let winner = "";
//gamerboard IIFE
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  //refresh blocks
  const updateGrid = () => {
    blocks.forEach(function (e, index) {
      e.textContent = board[index];
      if (e.textContent == "O") {
        e.style.color = "var(--col-accent2)";
      } else {
        e.style.color = "var(--col-accent)";
      }
    });
  };
  //on click set field with current.sign
  const setField = (index, sign) => {
    if (sign !== "O" && sign !== "X") {
      console.log("undefinded sign format: " + sign);
      return;
    } else {
      board[index] = sign;
      updateGrid();
      return;
    }
  };
  //player factory
  const createPlayer = (name, sign, container, score = 0) => {
    return { name, sign, container, score };
  };

  const player1 = createPlayer("Player 1", "X", playerOneContainer);
  const player2 = createPlayer("Player 2", "O", playerTwoContainer);
  let currentPlayer = player1;

  //"new game" button script
  const newGame = () => {
    for (let i = 0; i <= 8; i++) {
      board[i] = "";
    }

    blocks.forEach(function (e) {
      e.style.backgroundColor = "var(--col-dark1)";
    });
    currentPlayer = player1;
    currentPlayerSpan.textContent = "Player 1";
    updateGrid();
  };
  return {
    board,
    player1,
    player2,
    currentPlayer,
    setField,
    updateGrid,
    createPlayer,
    newGame,
  };
})();
//positions, when one of players win
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const checkWinner = () => {
  winningPositions.forEach((item, index) => {
    //check all winning positions
    if (
      gameBoard.board[item[0]] === gameBoard.currentPlayer.sign &&
      gameBoard.board[item[1]] === gameBoard.currentPlayer.sign &&
      gameBoard.board[item[2]] === gameBoard.currentPlayer.sign
    ) {
      winner = gameBoard.currentPlayer;
      winner.score++;
      winner.container.classList.remove("animate");
      winner.container.classList.add("animate");
      playerOneScore.textContent = `${gameBoard.player1.score} points`;
      playerTwoScore.textContent = `${gameBoard.player2.score} points`;
      turnText.textContent = "Winner is: " + winner.name;
      blocks.forEach((e) => {
        if (
          e.getAttribute("value") == item[0] ||
          e.getAttribute("value") == item[1] ||
          e.getAttribute("value") == item[2]
        ) {
          e.style.setProperty("background-color", "var(--col-dark2)");
        }
      });
    }
  });
};

function AIchoice() {
  gameBoard.currentPlayer = gameBoard.player2;
  if (gameBoard.board[4] == "") {
    gameBoard.setField(4, gameBoard.currentPlayer.sign);
    console.log("AI choice is:" + 4 + " block");
  } else {
    for (let i = 0; i < 10; i++) {
      let random = Math.floor(Math.random() * 8);
      if (gameBoard.board[random] == "") {
        console.log("AI choice is: " + (random + 1) + " block");
        gameBoard.setField(random, gameBoard.currentPlayer.sign);
        if (i == 5){
          console.warn("Can't set block");
        }
        break;
        
      }
    }
  }
  gameBoard.currentPlayer = gameBoard.player1;
  currentPlayerSpan.textContent = gameBoard.currentPlayer.name;
}

function nextPlayer() {
  if (gameBoard.currentPlayer == gameBoard.player2) {
    gameBoard.currentPlayer = gameBoard.player1;
    currentPlayerSpan.textContent = gameBoard.currentPlayer.name;
  } else {
    gameBoard.currentPlayer = gameBoard.player2;
    currentPlayerSpan.textContent = gameBoard.currentPlayer.name;
  }
}

function blockChange(e) {}

blocks.forEach((e) => {
  e.addEventListener("click", function () {
    const i = e.getAttribute("value");
    if (gameBoard.board[i] == "") {
      if (pcPlayer == false) {
        gameBoard.setField(i, gameBoard.currentPlayer.sign);
        checkWinner();
        nextPlayer();
      } else {
        gameBoard.setField(i, gameBoard.currentPlayer.sign);
        if (winner == "") {
          AIchoice();
        }
      }
    }
  });
});

newGameButton.addEventListener("click", gameBoard.newGame);
startBtn.addEventListener("click", () => {
  gameBoard.player1.name = playerOneInput.value;
  gameBoard.player2.name = playerTwoInput.value;
  playerOneName.textContent = gameBoard.player1.name;
  playerTwoName.textContent = gameBoard.player2.name;
  playerOneScore.textContent = `${gameBoard.player1.score} points`;
  playerTwoScore.textContent = `${gameBoard.player2.score} points`;

  currentPlayerSpan.textContent = gameBoard.currentPlayer.name;
  console.log("AI turn: " + AiCheckbox.checked);
  if (AiCheckbox.checked) {
    pcPlayer = true
  }

  formContainer.classList.add("none");
});
