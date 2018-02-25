import React, {Component} from 'react';

class KeySquare extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClickKeySquare(this.props.value)
  }

  render() {
    return (
      <button className="key-square" onClick={this.handleClick}>
        {this.props.value}
      </button>
    );
  }
}

class Keypad extends Component {

  constructor(props) {
    super(props);
    this.onClickKeySquare = this.onClickKeySquare.bind(this);
  }

  onClickKeySquare(key) {
    console.log(key);
    if (key === 'C') {
      this.props.onClickFuncs.clearExpr();
    }
    else if (key === 'D') {
      this.props.onClickFuncs.delExpr();
    }
    else if (key === '=') {
      console.log("Calculate");
      this.props.onClickFuncs.calcExpr();
    }
    else
      this.props.onClickFuncs.addExpr(key);
  }

  renderKeySquare(key) {
    return <KeySquare value={key} onClickKeySquare={this.onClickKeySquare}/>;
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