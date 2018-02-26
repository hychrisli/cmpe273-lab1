import React, { Component } from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';

import authClient from './components/auth-client'
import {ProjList} from './components/dashboard/projects';

class App extends Component {
  render() {
    return (
     <Admin authClient={authClient}
            restClient={jsonServerRestClient('http://jsonplaceholder.typicode.com')}>
       <Resource name="projects" list={ProjList} />
     </Admin>
    );
  }
}

export default App;
