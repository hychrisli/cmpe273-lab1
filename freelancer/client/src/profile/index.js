import React from 'react';

import { Card, CardText } from 'material-ui/Card';
import { ViewTitle } from 'admin-on-rest';

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
  </Card>

);

export default Profile;