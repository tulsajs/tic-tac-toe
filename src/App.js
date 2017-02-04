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
    if (this.state.winner) return;
    var { board, currentPlayer } = this.state;
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
    var winnerX = this.state.winningCombinations.some((combo) => {
      return combo.every(elem => this.pattern('X').indexOf(elem) > -1);
    })
    var winnerO = this.state.winningCombinations.some((combo) => {
      return combo.every(elem => this.pattern('O').indexOf(elem) > -1);
    })
    if (winnerX) {
      this.setState({winner: 'X' })
    } else if(winnerO) {
      this.setState({winner: 'O' })
    } else if(this.state.board.every(elem => elem !== "")) {
      this.setState({winner: 'Cat' })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="info">
          <div className="current">Current Player is {this.state.currentPlayer}</div>
          { this.state.winner ? <div className="winner">Winner is {this.state.winner}</div> : null }
          { this.state.winner ? <button className="reset" onClick={() => this.resetGame()}>Reset Game</button> : null }
        </div>
        <div className="ticTacToe">
          <div className="column">
            <span className="square" onClick={() => this.chooseLocation(0)}>{this.state.board[0]}</span>
            <span className="square" onClick={() => this.chooseLocation(1)}>{this.state.board[1]}</span>
            <span className="square" onClick={() => this.chooseLocation(2)}>{this.state.board[2]}</span>
          </div>
          <div className="column">
            <span className="square" onClick={() => this.chooseLocation(3)}>{this.state.board[3]}</span>
            <span className="square" onClick={() => this.chooseLocation(4)}>{this.state.board[4]}</span>
            <span className="square" onClick={() => this.chooseLocation(5)}>{this.state.board[5]}</span>
          </div>
          <div className="column">
            <span className="square" onClick={() => this.chooseLocation(6)}>{this.state.board[6]}</span>
            <span className="square" onClick={() => this.chooseLocation(7)}>{this.state.board[7]}</span>
            <span className="square" onClick={() => this.chooseLocation(8)}>{this.state.board[8]}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
