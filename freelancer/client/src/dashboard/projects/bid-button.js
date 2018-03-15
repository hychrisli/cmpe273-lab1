import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';

class BidButton extends Component{

  static propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    client: PropTypes.object,
  };

  handleClick =  () => {
    this.props.push("/bids/create");
  };

  render() {
    const {
      record,
      client:{
        token
      }
    } = this.props;
    return <FlatButton label={"Bid"} disabled={record.employer === token.username} onClick={this.handleClick}/>
  }
}

const mapStateToProps = state => ({
  client: state.client,
});

export default connect(mapStateToProps, {
  push: pushAction,
})(BidButton);