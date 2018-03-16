import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';

class SkillsButton extends Component{

  static propTypes = {
    push: PropTypes.func,
    project: PropTypes.object,
    client: PropTypes.object
  };

  handleClick =  () => {
    console.log("skills");
    console.log(this.props.project);
    this.props.push('/proj-skills?filter={"project_id"%3A"1"}&order=DESC&page=1&perPage=10&sort=id');
  };

  render() {
    return <FlatButton label={"Skills"} onClick={this.handleClick}/>
  }
}

const mapStateToProps = state => ({
  client: state.client,
  project: state.project,
});

export default connect(mapStateToProps, {
  push: pushAction,
})(SkillsButton);
