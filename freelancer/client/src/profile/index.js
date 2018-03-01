import React from 'react';

import {ViewTitle} from 'admin-on-rest';
import { Card, CardText } from 'material-ui/Card';
import ProfileForm from './profile-form';


const styles = {
  label: {width: '10em', display: 'inline-block'},
  button: {margin: '1em'},
};

const Profile = () => (

  <Card>
    <ViewTitle title="My Profile" />
    <CardText>
      <div style={styles.label}>Hello there</div>
    </CardText>
    <ProfileForm/>
  </Card>

);

export default Profile;