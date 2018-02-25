import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Display from './display'
import Keypad from './keypad'


class Window extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expr: []
    };
    this.addExpr = this.addExpr.bind(this);
    this.clearExpr = this.clearExpr.bind(this);
    this.delExpr = this.delExpr.bind(this);
    this.calcExpr = this.calcExpr.bind(this);
  }

  addExpr(c) {
    this.setState({expr: this.state.expr.concat(c)});
  }

  clearExpr() {
    this.setState({expr: []})
  }

  delExpr() {
    const myExpr = this.state.expr;
    const exprLen = myExpr.length;
    if ( exprLen > 0)
      this.setState({expr: this.state.expr.slice(0, exprLen - 1)})
  }

  calcExpr() {
    this.callApi()
      .then(res => this.setState({expr:[res]}))
      .catch(err => console.log(err));

/*    try{
      let result = eval(this.state.expr.join(''));
      this.setState({expr: [result]})
    }catch(SyntaxEror){
      console.log("wrong expression");
    }*/
  }

  callApi = async() => {
    const response = await fetch('/calc', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        expr: this.state.expr.join('')
      })
    });
    const body = await response.json();
    if ( response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const color1 = {backgroundColor: '#ffd9ad'};
    const color2 = {backgroundColor: '#cfedff'};
    const onClickFuncs = {
      addExpr: this.addExpr,
      clearExpr: this.clearExpr,
      delExpr: this.delExpr,
      calcExpr: this.calcExpr
    };

    return (
      <Grid className="window">
        <Row>
          <Col id="div-col" style={color2}>
            <div id={"div-content"}>
              <Display calcParm={this.state}/>
            </div>
          </Col>
        </Row>
        <Row>
          <Col id="div-col" style={color1}>
            <div id={"div-content"}>
              <Keypad onClickFuncs={onClickFuncs}/>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Window;