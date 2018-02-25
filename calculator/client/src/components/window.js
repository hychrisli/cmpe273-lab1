import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Display from './display'
import Keypad from './keypad'


class Window extends Component {

  render(){
    const color1 = {backgroundColor: '#ffd9ad'};
    const color2 = {backgroundColor: '#cfedff'};

    return (
      <Grid className="window">
        <Row  >
          <Col id="div-col" style={color2}>
            <div id={"div-content"}>
              <Display/>
            </div>
          </Col>
        </Row>
        <Row >
          <Col id="div-col" style={color1}>
            <div id={"div-content"}>
              <Keypad/>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default Window;