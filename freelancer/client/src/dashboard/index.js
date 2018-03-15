import React, {Component} from 'react';
import {jsonServerRestClient, Admin, Resource} from 'admin-on-rest';
import PropTypes from 'prop-types'

import customRoutes from './routes';
import IndexSaga from '../index-saga'
import Logout from './logout'

import profile from './profile/reducer'
import client from '../client/reducer'

import Menu from './menu';
import {ProjList, ProjEdit, ProjCreate, ProjShow} from './projects';
import {BidList, BidCreate} from './bids'
import {connect} from "react-redux";

class Dashboard extends Component {

  static propTypes = {
    client: PropTypes.shape({
      id: PropTypes.string,
      token:  PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        aboutMe: PropTypes.string,
        image: PropTypes.string
      })

    })
  };

  render() {

    console.log("Admin initial State");
    console.log(this.props.client);

    return (
      <div>
        <Logout/>
        <Admin // authClient={authClient}
          customReducers={{profile, client}}
          customSagas={[IndexSaga]}
          menu={Menu}
          initialState={{'client': this.props.client}}
          title={"Freelancer"}
          customRoutes={customRoutes}
          restClient={jsonServerRestClient(`${process.env.REACT_APP_API_URL}`)}>
          <Resource name='projects'
                    list={ProjList}
                    show={ProjShow}
                    edit={ProjEdit}
                    create={ProjCreate}
          />
          <Resource name={'bids'}
                    list={BidList}
                    create={BidCreate}
          />
          <Resource name={"profile"}/>
        </Admin>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  client: state.client
});

const connected = connect(mapStateToProps)(Dashboard);

export default connected;