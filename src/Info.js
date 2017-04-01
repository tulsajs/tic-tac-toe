import React, { Component } from "react";

class Info extends Component {
  render() {
    console.log(this.props)
    const { match, socket } = this.props;
    return (
      <div className="info">
        <div className="current">Your id is {socket.id}</div>
        <div className="current">Current Player is {match.currentPlayer}</div>
        {match.winner
          ? <div>
              <div className="winner">Winner is {match.winner}</div>
              <button className="reset" onClick={match.onClick}>Reset Game</button>
            </div>
          : null}
      </div>
    );
  }
}

export default Info;
