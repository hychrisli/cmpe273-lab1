import React, {Component} from 'react';

class Display extends Component {

  render() {
    return(
      <div id="div-display">
        {this.props.expr.join('')}
      </div>
    );
  }
}

export default Display;