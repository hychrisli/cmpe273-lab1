import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Messages from '../../notifications/messages'
import Errors from '../../notifications/errors'


class BidCreate extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    client: PropTypes.shape({
      token: PropTypes.shape({
        username: PropTypes.string
      })
    }),
    project: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    })
  };

  componentDidMount(){
    const {
      client: {token: {username}},
      project: {id}
    } = this.props;

    this.props.initialize({
      username: username,
      projectId: id
    });

  }

  submit(){
  }

  render() {
    const {
      project: {title}
    } = this.props;

    return (
      <div className={"bid"}>
        <form className="widget-form">
          <h1>Bidding</h1>
          <h3>Project: {title} </h3>
          <label>Username</label>
          <Field
            name={"username"}
            type={"text"}
            component={"input"}
            label={"username"}
            disabled={true}
          />
          <label>Project ID</label>
          <Field
            name={"projectId"}
            type={"text"}
            component={"input"}
            label={"projectId"}
            disabled={true}
          />
          <label>Bid Price</label>
          <Field
            name={"bidPrice"}
            type={"number"}
            component={"input"}
            label={"bidPrice"}
          />
          <label>Bid Days</label>
          <Field
            name={"bidDays"}
            type={"number"}
            component={"input"}
            label={"bidDays"}
          />
          <button type="submit">Bid</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  project: state.project,
  client: state.client,
  enableReinitialize: true
});


const connected = connect(mapStateToProps)(BidCreate);

const formed = reduxForm({
  form: 'bid',
})(connected);

export default formed;