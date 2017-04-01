import * as types from "../actions/actionTypes";

const players = [];
let match = {
  board: ["", "", "", "", "", "", "", "", ""],
  players: players,
  currentPlayer: null,
  winner: null,
  winningCombinations: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
};

export default (state = match, action) => {
  switch (action.type) {
    case types.MAKE_MOVE:
      const board = state.board.map((piece, index) => {
        return index === action.position ? action.currentPlayer : piece;
      });
      return {
        ...state,
        currentPlayer: action.currentPlayer === "X" ? "O" : "X",
        board: board,
        winner: checkWinner(board)
      };
    case types.SET_PLAYERS:
      return {
        ...state,
        players: action.players,
        currentPlayer: action.currentPlayer
      }
    case types.RESET_GAME:
      return match;
    default:
      return state;
  }
};

/*
* Check if winning combo matches
*/
function checkWinner(board) {
  const winnerX = checkCombo(board, "X");
  const winnerO = checkCombo(board, "O");

  if (winnerX) {
    return "X";
  } else if (winnerO) {
    return "O";
  } else if (board.every(elem => elem !== "")) {
    return "Cat";
  }
}

/*
* Compare winning combo to current state
* params: player === X or O
*/
function checkCombo(board, player) {
  const { winningCombinations } = match;
  return winningCombinations.some(combo => {
    return combo.every(elem => pattern(board, player).indexOf(elem) > -1);
  });
}

/*
* Turn the current state into a pattern based on player
* params: letter === player X or O
*/
function pattern(board, letter) {
  var pattern = [];
  board.forEach((element, index) => {
    if (element === letter) {
      pattern.push(index);
    }
  });
  return pattern;
}
