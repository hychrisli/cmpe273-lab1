import React, {Component} from 'react'
import PropTypes from "prop-types";

import {unsetClient} from '../client/actions'
import {connect} from "react-redux";
import {reduxForm} from "redux-form";

class Logout extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
  };

  submit = () => {
    this.props.unsetClient();
  };

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <div className={"logout"}>
        <form onSubmit={handleSubmit(this.submit)}>
          <button type="submit">Log Out</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  logout: state.logout
});


const connected = connect(mapStateToProps, {unsetClient})(Logout);

const formed = reduxForm({
  form: 'logout'
})(connected);


export default formed;