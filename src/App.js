import React, { Component } from 'react';
import './App.css';

class App extends Component {
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

  chooseLocation(index) {
    var { board, currentPlayer } = this.state;
    if (this.state.winner || board[index] !== '') return;
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    this.setState({board, currentPlayer})
    this.checkWinner();
  }

  pattern(letter) {
    var pattern = [];
    this.state.board.forEach((element, index) => {
      if(element === letter) {
        pattern.push(index);
      }
    })
    return pattern;
  }

  resetGame() {
    this.setState({ board: ['','','','','','','','',''], winner: null})
  }

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

  checkCombo(player) {
    const { winningCombinations } = this.state;
    return winningCombinations.some((combo) => {
      return combo.every(elem => this.pattern(player).indexOf(elem) > -1);
    })
  }

  renderColumn(section) {
    return (
      <div className="column"> 
        { section.map((index) => this.renderSquare(index)) }
      </div>
    )
  }

  renderSquare(index) {
    return (
      <span className="square" onClick={() => this.chooseLocation(index)}>{this.state.board[index]}</span>
    )
  }

  renderInfo() {
    const { currentPlayer, winner } = this.state;
    return (
      <div className="info">
        <div className="current">Current Player is {currentPlayer}</div>
        { winner ? this.renderWinner() : null }
      </div>
    )
  }

  renderWinner() {
    const { winner } = this.state;
    return (
      <div>
        <div className="winner">Winner is {winner}</div>
        <button className="reset" onClick={() => this.resetGame()}>Reset Game</button>
      </div>
    )
  }

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
