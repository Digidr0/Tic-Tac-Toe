const blocks = document.querySelectorAll(".block");

const pcPlayer = false;
winner = "";
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const updateGrid = () => {
    blocks.forEach(function (e, index) {
      e.textContent = board[index];
      if(e.textContent == "O"){
        e.style.setProperty("color", "var(--col-accent2)");
      }
    });
  };
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

  const createPlayer = (name, sign) => {
    return { name, sign };
  };

  const player1 = createPlayer("Alex", "X");
  const player2 = createPlayer("AI", "O");

  let currentPlayer = player1;
  return {
    board,
    setField,
    updateGrid,
    createPlayer,
    player1,
    player2,
    currentPlayer,
  };
})();

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
    if (
      gameBoard.board[item[0]] === gameBoard.currentPlayer.sign &&
      gameBoard.board[item[1]] === gameBoard.currentPlayer.sign &&
      gameBoard.board[item[2]] === gameBoard.currentPlayer.sign
    ) {
      winner = gameBoard.currentPlayer.name;
      console.log("winner is: " + winner);
    } else {
    }
  });
};

function AIchoice() {
  gameBoard.currentPlayer = gameBoard.player2;
  if (gameBoard.board[4] == "") {
    gameBoard.setField(4, gameBoard.currentPlayer.sign);
  } else {
    for (let i = 0; i < 10; i++) {
      let random = Math.floor(Math.random() * 8);
      console.log("ai choice is: " + random);
      if (gameBoard.board[random] == "") {
        gameBoard.setField(random, gameBoard.currentPlayer.sign);
        break;
      }
    }
  }
  gameBoard.currentPlayer = gameBoard.player1;
}

function nextPlayer() {
  if (gameBoard.currentPlayer == gameBoard.player2) {
    gameBoard.currentPlayer = gameBoard.player1;
  } else {
    gameBoard.currentPlayer = gameBoard.player2;
  }
}

blocks.forEach((e) => {
  e.addEventListener("click", () => {
    const i = e.getAttribute("value");
    if (gameBoard.board[i] == "") {
      if (pcPlayer == false) {
        gameBoard.setField(i, gameBoard.currentPlayer.sign);
        nextPlayer();
      } else {
        gameBoard.setField(i, gameBoard.currentPlayer.sign);
        if (winner == "") {
          AIchoice();
        }
      }
      checkWinner();
    }
  });
});
//main code
gameBoard.updateGrid();
