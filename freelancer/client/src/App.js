import React, {Component} from 'react';
import {jsonServerRestClient, Admin, Resource} from 'admin-on-rest';

import authClient from './components/auth-client'
import {ProjList, ProjEdit, ProjCreate, ProjShow} from './components/dashboard/projects';
import {MeShow, MeEdit} from './components/dashboard/profile'

class App extends Component {
  render() {
    return (
      <Admin // authClient={authClient}
        restClient={jsonServerRestClient('http://localhost:5000/api')}>
        <Resource name='users' options={{label: 'My Profile'}} show={MeShow} edit={MeEdit}/>
        <Resource name='projs' options={{label: 'Projects'}} list={ProjList} show={ProjShow} edit={ProjEdit}
                  create={ProjCreate}/>
      </Admin>
    );
  }
}

export default App;
