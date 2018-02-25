import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Display from './display'
import Keypad from './keypad'


class Window extends Component {

  constructor(props){
    super(props);
    this.state = {
      expr: []
    };
    this.addExpr = this.addExpr.bind(this);
  }

  addExpr(c) {
    this.setState({expr : this.state.expr.concat(c)});
    console.log(c);
  }

  render(){
    const color1 = {backgroundColor: '#ffd9ad'};
    const color2 = {backgroundColor: '#cfedff'};

    return (
      <Grid className="window">
        <Row  >
          <Col id="div-col" style={color2}>
            <div id={"div-content"}>
              <Display expr={this.state.expr}/>
            </div>
          </Col>
        </Row>
        <Row >
          <Col id="div-col" style={color1}>
            <div id={"div-content"}>
              <Keypad onClickAddExpr={this.addExpr}/>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default Window;