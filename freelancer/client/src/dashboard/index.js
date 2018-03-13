import React, {Component} from 'react';
import {jsonServerRestClient, Admin, Resource} from 'admin-on-rest';
import customRoutes from './routes';
import IndexSaga from '../index-saga'
import Logout from './logout'

import profile from './profile/reducer'
import account from './profile/account'
import client from  '../client/reducer'

import Menu from './menu';


import {ProjList, ProjEdit, ProjCreate, ProjShow} from './projects';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Logout/>
        <Admin // authClient={authClient}
          customReducers={{profile, account, client}}
          customSagas={[IndexSaga]}
          menu={Menu}
          title={"Freelancer"}
          customRoutes={customRoutes}
          restClient={jsonServerRestClient(`${process.env.REACT_APP_API_URL}`)}>
          <Resource name='projects'
                    list={ProjList}
                    show={ProjShow}
                    edit={ProjEdit}
                    create={ProjCreate}/>
          <Resource name={"profile"}/>
        </Admin>
      </div>
    );
  }
}

export default Dashboard;
