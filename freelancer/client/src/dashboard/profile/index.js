import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'

import Messages from '../../notifications/messages'
import Errors from '../../notifications/errors'

import {profileUpdate} from "./actions";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  static propTypes = {
    handleSubmit: PropTypes.func,
    profileUpdate: PropTypes.func,
    profile: PropTypes.shape({
      updating: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
    client: PropTypes.shape({
      id: PropTypes.string,
      token: PropTypes.shape({
        email: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        aboutMe: PropTypes.string
      })
    })
  };

  submit = (values) => {
    values['username'] = this.state.username;
    console.log(values);
    this.props.profileUpdate(values);

  };


  componentDidMount() {
    const {
      client: {
        token: {
          username,
          email,
          first_name,
          last_name,
          about_me
        }
      }
    } = this.props;

    this.props.initialize({
      email: email,
      firstName: first_name,
      lastName: last_name,
      aboutMe: about_me
    });

    this.setState({username})
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

    return (
      <div className={"profile"}>
        <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Profile</h1>
          <label>Username: {this.state.username}</label>
          <label>Password</label>
          <Field
            name={"password"}
            type={"text"}
            component={"input"}
            label={"password"}
          />
          <label>Email</label>
          <Field
            name={"email"}
            type={"text"}
            component={"input"}
            label={"Email"}
          />
          <label>First Name</label>
          <Field
            name={"firstName"}
            type={"text"}
            component={"input"}
            label={"FirstName"}
          />
          <label>Last Name</label>
          <Field
            name={"lastName"}
            type={"text"}
            component={"input"}
            label={"LastName"}
          />
          <label>About Me</label>
          <Field
            name={"aboutMe"}
            type={"text"}
            component={"input"}
            label={"AboutMe"}
          />
          <button type="submit">Update</button>
        </form>
        <div className={"auth-messages"}>
          {!updating && !!errors && (
            <Errors message={"Failed to update profile due to: "} errors={errors}/>
          )}
          {!updating && !!messages.length && (<Messages messages={messages}/>)}
          {!updating && successful && (<div>Profile update successful </div>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  client: state.client,
  enableReinitialize: true
});


const connected = connect(mapStateToProps, {profileUpdate})(Profile);


const formed = reduxForm({
  form: 'profile',
})(connected);

export default formed;

