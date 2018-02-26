import React, {Component} from 'react';

class Display extends Component {

  render() {
    return(
      <input type="text" id="div-display"
                value={this.props.calcParm.expr.join('')}/>
    );
  }
}

export default Display;