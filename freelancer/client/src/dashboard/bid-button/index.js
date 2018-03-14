import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class BidButton extends Component{

  propTypes = {
   record: PropTypes.object,
  };

  handleClick =  () => {
    console.log("Clicked");
    console.log(this.props.record)
  };

  render() {
    return <FlatButton label={"Bid"} onClick={this.handleClick}/>
  }
}



export default BidButton;
