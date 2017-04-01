import React, { Component } from "react";
import Info from "./Info";
import Firework from "./Firework";
import "./App.css";
import reduxHelper from "./helpers/reduxHelper";
import * as matchActions from "./actions/matchActions";

class App extends Component {
  /*
  * Setup App State
  */
  constructor(props) {
    super(props);
    this.resetGame = this.resetGame.bind(this);
  }

  /*
  * OnClick Event for handling player square select
  * params: index === square clicked board state
  */
  makeMove(position) {
    var { match, actions } = this.props;
    if (match.winner || match.board[position] !== "") return;
    actions.makeMove(match.currentPlayer, position);
  }

  /*
  * Resets state for game
  */
  resetGame() {
    this.props.actions.resetGame();
  }

  /*
  * Render a column containing three squares
  * params: section === array of board pieces
  */
  renderColumn(section) {
    return (
      <div className="column">
        {section.map(index => this.renderSquare(index))}
      </div>
    );
  }

  /*
  * Render a square from the board
  * params: index === index of board pieces
  */
  renderSquare(index) {
    return (
      <span key={index} className="square" onClick={() => this.makeMove(index)}>
        {this.props.match.board[index]}
      </span>
    );
  }

  /*
  * Render entire app
  */
  render() {
    const { winner } = this.props.match;
    return (
      <div className="App">
        <Info {...this.props.match} onClick={this.resetGame} />
        <Firework {...this.props.match} />
        <div className="ticTacToe">
          {winner === "Cat"
            ? <img
                className="catImage"
                src="http://thecatapi.com/api/images/get?format=src&amp;type=gif"
              />
            : null}
          {this.renderColumn([0, 1, 2])}
          {this.renderColumn([3, 4, 5])}
          {this.renderColumn([6, 7, 8])}
        </div>
      </div>
    );
  }
}

export default reduxHelper(App, matchActions);
