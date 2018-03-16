import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Messages from '../../notifications/messages'
import Errors from '../../notifications/errors'
import {bidProject} from './actions'

class BidCreate extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    bidProject: PropTypes.func,
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

  submit =(values) => {
    this.props.bidProject(values);
  };

  render() {
    const {
      handleSubmit,
      project: {title},
      bid: {
        bidding,
        successful,
        messages,
        errors
      }
    } = this.props;

    return (
      <div className={"bid"}>
        <form className="widget-form"  onSubmit={handleSubmit(this.submit)}>
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
        <div className={"auth-messages"}>
          {!bidding && !!errors.length && (
            <Errors message={"Failure to bid due to: "} errors={errors}/>
          )}
          {!bidding && !!messages.length && (
            <Messages messages={messages}/>
          )}
          {bidding && <div> Bidding...</div>}
          {!bidding && successful && (<div>Bid successful!</div>)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  project: state.project,
  client: state.client,
  bid: state.bid,
  enableReinitialize: true
});


const connected = connect(mapStateToProps, {bidProject})(BidCreate);

const formed = reduxForm({
  form: 'bid',
})(connected);

export default formed;