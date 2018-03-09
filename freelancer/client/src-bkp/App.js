import React, {Component} from 'react';
import {jsonServerRestClient, Admin, Resource} from 'admin-on-rest';

import customRoutes from './routes';
import Menu from './menu';


import {ProjList, ProjEdit, ProjCreate, ProjShow} from './projects';

class App extends Component {
  render() {
    return (
      <Admin // authClient={authClient}
        title={"Freelancer"}
        menu={Menu}
        customRoutes={customRoutes}
        restClient={jsonServerRestClient('http://localhost:5000/api')}>
        <Resource name='projects'
                  list={ProjList}
                  show={ProjShow}
                  edit={ProjEdit}
                  create={ProjCreate}/>
        <Resource name="profile"/>
      </Admin>
    );
  }
}

export default App;
