import React, {Component} from 'react';
import {reduxForm, Field, Password} from 'redux-form'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Messages from '../notifications/messages'
import Errors from '../notifications/errors'
import Logout from '../logout'

import {profileUpdate, profileGet} from "./actions";

class Profile extends Component{

  constructor(props){
    super(props);
    this.state = {
      username: "",
    };
  }

  static propTypes = {
    handleSubmit: PropTypes.func,
    profileUpdate: PropTypes.func,
    profileGet: PropTypes.func,
    profile: PropTypes.shape({
      updating: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,}),
    account: PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      aboutMe: PropTypes.string
    })
  };

  submit = (values) => {
    this.props.profileUpdate(values);
    this.props.profileGet(this.state.username);
  };

  componentWillMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    this.props.profileGet(token.username);
    this.setState({username: token.username})
  }

  render() {
    const {
      handleSubmit,
      profile: {
        updating,
        successful,
        messages,
        errors,
      },
    } = this.props;

    console.log(this.props.account);

    return (
      <div className={"profile"}>
        <Logout/>
        <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Profile</h1>
          <label htmlFor={'username'}>Username: {this.state.username}</label>
          <label htmlFor={"email"}>Email: {this.props.account.email}</label>
          <Field
            name={"email"}
            type={"text"}
            id={"email"}
            className={"email"}
            component={"input"}
            label={"email"}
          />
          <label htmlFor={"password"}>Password</label>
          <Field
            name={"password"}
            type={"password"}
            id={"password"}
            className={"password"}
            component={"input"}
            label={"password"}
          />
          <label htmlFor={"FirstName"}>First Name: {this.props.account.firstName}</label>
          <Field
            name={"firstName"}
            type={"text"}
            id={"firstName"}
            className={"firstName"}
            component={"input"}
            label={"FirstName"}
          />
          <label htmlFor={"LastName"}>Last Name: {this.props.account.lastName}</label>
          <Field
            name={"lastName"}
            type={"text"}
            id={"lastName"}
            className={"lastName"}
            component={"input"}
            label={"LastName"}
          />
          <label htmlFor={"AboutMe"}>About Me: {this.props.account.aboutMe}</label>
          <Field
            name={"aboutMe"}
            type={"text"}
            id={"aboutMe"}
            className={"aboutMe"}
            component={"input"}
            label={"AboutMe"}
          />
          <button type="submit">Update</button>
        </form>
        <div className={"auth-messages"}>
          {!updating && !!errors && (
            <Errors message={"Failed to update profile due to: "} errors={errors}/>
          )}
          {!updating && !!messages.length && ( <Messages messages={messages} />)}
          {!updating && successful && (<div>Profile update successful </div>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  profile: state.profile,
  account: state.account,
  enableReinitialize: true
});


const connected = connect(mapStateToProps, {profileUpdate,profileGet})(Profile);


const formed = reduxForm({
  form: 'profile',
})(connected);

export default formed;

