import React, { Component } from 'react';
import './App.css';

class App extends Component {
  /*
  * Setup App State
  */
  constructor() {
    super();
    const players = ['X', 'O'];
    this.state = {
      board: ['','','','','','','','',''],
      players: players,
      currentPlayer: players[Math.floor(Math.random()*players.length)],
      winner: null,
      winningCombinations: [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    }
  }

  /*
  * OnClick Event for handling player square select
  * params: index === square clicked board state
  */
  makeMove(index) {
    var { board, currentPlayer } = this.state;
    if (this.state.winner || board[index] !== '') return;
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    this.setState({board, currentPlayer})
    this.checkWinner();
  }

  /*
  * Resets state for game
  */
  resetGame() {
    this.setState({ board: ['','','','','','','','',''], winner: null})
  }

  /*
  * Check if winning combo matches
  */
  checkWinner() {
    const winnerX = this.checkCombo('X');
    const winnerO = this.checkCombo('O');

    if (winnerX) {
      this.setState({winner: 'X'})
    } else if(winnerO) {
      this.setState({winner: 'O'})
    } else if(this.state.board.every(elem => elem !== "")) {
      this.setState({winner: 'Cat'})
    }
  }

  /*
  * Compare winning combo to current state
  * params: player === X or O
  */
  checkCombo(player) {
    const { winningCombinations } = this.state;
    return winningCombinations.some((combo) => {
      return combo.every(elem => this.pattern(player).indexOf(elem) > -1);
    })
  }

  /*
  * Turn the current state into a pattern based on player
  * params: letter === player X or O
  */
  pattern(letter) {
    var pattern = [];
    this.state.board.forEach((element, index) => {
      if(element === letter) {
        pattern.push(index);
      }
    })
    return pattern;
  }

  /*
  * Render a column containing three squares
  * params: section === array of board pieces
  */
  renderColumn(section) {
    return (
      <div className="column"> 
        { section.map((index) => this.renderSquare(index)) }
      </div>
    )
  }

  /*
  * Render a square from the board
  * params: index === index of board pieces
  */
  renderSquare(index) {
    return (
      <span className="square" onClick={() => this.makeMove(index)}>{this.state.board[index]}</span>
    )
  }

  /*
  * Render current player and winner info
  */
  renderInfo() {
    const { currentPlayer, winner } = this.state;
    return (
      <div className="info">
        <div className="current">Current Player is {currentPlayer}</div>
        { winner ? this.renderWinner() : null }
      </div>
    )
  }

  /*
  * Render winner and reset button
  */
  renderWinner() {
    const { winner } = this.state;
    return (
      <div>
        <div className="winner">Winner is {winner}</div>
        <button className="reset" onClick={() => this.resetGame()}>Reset Game</button>
      </div>
    )
  }

  /*
  * Render entire app
  */
  render() {
    return (
      <div className="App">
        {this.renderInfo()}
        <div className="ticTacToe">
          {this.renderColumn([0,1,2])}
          {this.renderColumn([3,4,5])}
          {this.renderColumn([6,7,8])}
        </div>
      </div>
    );
  }
}

export default App;
