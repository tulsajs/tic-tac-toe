import React, { Component } from 'react';

class Info extends Component {
  render() {
    const { currentPlayer, winner, onClick } = this.props;
    return (
      <div className="info">
        <div className="current">Current Player is {currentPlayer}</div>
        { winner ? <div>
                     <div className="winner">Winner is {winner}</div>
                     <button className="reset" onClick={onClick}>Reset Game</button>
                   </div> : null }
      </div>
    )
  }
}

export default Info;
