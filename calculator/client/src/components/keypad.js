import React, {Component} from 'react';


class KeySquare extends Component {
  render() {
    return (
      <button className="key-square">
        {this.props.value}
      </button>
    );
  }
}

class Keypad extends Component {

  renderKeySquare(key) {
    return <KeySquare value={key}/>;
  }

  render() {
    return (
      <div>
        <div className="keypad-row">
          {this.renderKeySquare(7)}
          {this.renderKeySquare(8)}
          {this.renderKeySquare(9)}
          {this.renderKeySquare('+')}
          {this.renderKeySquare('-')}
        </div>
        <div className="keypad-row">
          {this.renderKeySquare(4)}
          {this.renderKeySquare(5)}
          {this.renderKeySquare(6)}
          {this.renderKeySquare('*')}
          {this.renderKeySquare('/')}
        </div>
        <div className="keypad-row">
          {this.renderKeySquare(1)}
          {this.renderKeySquare(2)}
          {this.renderKeySquare(3)}
          {this.renderKeySquare('(')}
          {this.renderKeySquare(')')}
        </div>
        <div className="keypad-row">
          {this.renderKeySquare('.')}
          {this.renderKeySquare(0)}
          {this.renderKeySquare('=')}
          {this.renderKeySquare('C')}
          {this.renderKeySquare('D')}
        </div>
      </div>
    );
  }

}

export default Keypad;