import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Display from './display'
import Keypad from './keypad'


class Window extends Component {

  render(){
    const color1 = {backgroundColor: '#ffd9ad'};
    const color2 = {backgroundColor: '#cfedff'};

    return (
      <Grid className="container-fluid">
        <Row className="show-grid">
          <Col id="div-form" sm={8} style={color2}>
            <Display/>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col id="div-form" sm={8} style={color1}>
            <Keypad/>
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default Window;