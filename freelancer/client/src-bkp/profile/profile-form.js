import React from 'react';

import {Dialog, TextField} from "material-ui";

class ProfileForm extends React.Component {

  render() {
    return(
      <form>
        <TextField name="username"/>
        <TextField name="email"/>
      </form>
  )}
};

export default ProfileForm;