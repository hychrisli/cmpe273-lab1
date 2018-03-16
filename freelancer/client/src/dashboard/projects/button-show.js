import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import {setProject} from './actions';

class ShowButton extends Component{

  static propTypes = {
    push: PropTypes.func,
    setProject: PropTypes.func,
    record: PropTypes.object,
  };

  handleClick =  () => {
    this.props.setProject(this.props.record);
    this.props.push("/projects/" + this.props.record.id + "/show");
  };

  render() {
    return <FlatButton label={"Show"} onClick={this.handleClick}/>
  }
}

const mapStateToProps = state => ({
  client: state.client,
});

export default connect(mapStateToProps, {
  push: pushAction,setProject
})(ShowButton);
