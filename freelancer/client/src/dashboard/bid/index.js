import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import { push as pushAction } from 'react-router-redux';
import PropTypes from 'prop-types'

import Messages from '../../notifications/messages'
import Errors from '../../notifications/errors'
import {bidProject} from './actions'
import {renderField, required, number, maxValue, minValue} from '../lib/validate'

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
      submitting,
      project: {title, max_budget, min_budget},
      bid: {
        bidding,
        successful,
        messages,
        errors
      },
    } = this.props;

    const minPrice = minValue(min_budget);
    const maxPrice = maxValue(max_budget);

    return (
      <div className={"bid"}>
        <form className="widget-form"  onSubmit={handleSubmit(this.submit)}>
          <h1>Bidding</h1>
          <h3>Project: {title} </h3>
          <Field
            name={"username"}
            type={"text"}
            component={"input"}
            label={"Username"}
            disabled={true}
          />
          <Field
            name={"projectId"}
            type={"text"}
            component={"input"}
            label={"Project ID"}
            disabled={true}
          />
          <Field
            name={"bidPrice"}
            type={"number"}
            component={renderField}
            label={"Bid Price: $" + min_budget + " ~ $" + max_budget}
          />
          <Field
            name={"bidDays"}
            type={"number"}
            component={renderField}
            label={"Bid Days"}
          />
          <button type="submit" disabled={submitting}>Bid</button>
        </form>
        <div className={"auth-messages"}>
          {!bidding && !!errors.length && (
            <Errors message={"Failure to bid due to: "} errors={errors}/>
          )}
          {!bidding && !!messages.length && (
            <Messages messages={messages}/>
          )}
          {bidding && <div> Bidding...</div>}
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

const connected = connect(mapStateToProps, {bidProject, push: pushAction})(BidCreate);

const formed = reduxForm({
  form: 'bid',
})(connected);

export default formed;