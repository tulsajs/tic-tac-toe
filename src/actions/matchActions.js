import * as types from "./actionTypes";

// export const addPerson = person => {
//   return {
//     type: types.ADD_PERSON,
//     person
//   };
// };

export const makeMove = (currentPlayer, position) => {
  return {
    type: types.MAKE_MOVE,
    currentPlayer,
    position
  };
};

export const resetGame = () => {
  return {
    type: types.RESET_GAME
  };
};
