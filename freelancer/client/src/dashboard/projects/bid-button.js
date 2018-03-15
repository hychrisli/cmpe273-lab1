import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';

class BidButton extends Component{

  static propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
  };

  handleClick =  () => {
    this.props.push("/bids/create");
  };

  render() {
    return <FlatButton label={"Bid"} onClick={this.handleClick}/>
  }
}

export default connect(null, {
  push: pushAction,
})(BidButton);
