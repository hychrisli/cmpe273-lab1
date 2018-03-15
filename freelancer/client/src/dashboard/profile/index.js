import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'

import Messages from '../../notifications/messages'
import Errors from '../../notifications/errors'

import {profileUpdate} from "./actions";

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
    this.props.profileUpdate(values);
  };


  componentDidMount() {
    console.log('profile did mount');
    console.log(this.props.client);
    const {
      client: {
        token:{
          username,
          email,
          first_name,
          last_name,
          about_me
        }
      }
    } = this.props;

    this.props.initialize({
      email:email,
      firstName: first_name,
      lastName: last_name,
      aboutMe: about_me
    });

    this.setState({username})
  }

  renderTextField = ({
    input, label, defaultValue, meta: {touched, error}, ...custom
  })=> (
    <TextField
      hintText={label}
      floatingLableText={label}
      errorText={touched && error}
      defaultValue={defaultValue}
      {...input}
      {...custom}
    />
  );

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
        <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Profile</h1>
          <label htmlFor={'username'}>Username: {this.state.username}</label>
          <label htmlFor={"Email"}>Email</label>
          <Field
            name={"email"}
            component={"input"}
            label={"Email"}
          />
          <label htmlFor={"password"}>Password</label>
          <Field
            name={"password"}
            component={"input"}
            label={"password"}
          />
          <label htmlFor={"FirstName"}>First Name</label>
          <Field
            name={"firstName"}
            component={"input"}
            label={"FirstName"}
          />
          <label htmlFor={"LastName"}>Last Name</label>
          <Field
            name={"lastName"}
            type={"text"}
            id={"lastName"}
            className={"lastName"}
            component={"input"}
            label={"LastName"}
          />
          <label htmlFor={"AboutMe"}>About Me</label>
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
  client: state.client,
  enableReinitialize: true
});


const connected = connect(mapStateToProps, {profileUpdate})(Profile);


const formed = reduxForm({
  form: 'profile',
})(connected);

export default formed;

