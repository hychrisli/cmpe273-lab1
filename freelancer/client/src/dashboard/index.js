import React, {Component} from 'react';
import {jsonServerRestClient, Admin, Resource, Delete} from 'admin-on-rest';
import PropTypes from 'prop-types'

import customRoutes from './routes';
import IndexSaga from '../index-saga'
import BidSaga from  './bid/sagas';
import Logout from './logout'

import profile from './profile/reducer'
import client from '../client/reducer'
import project from './projects/reducer'
import bid from './bid/reducer'

import Menu from './menu';
import {ProjList, ProjEdit, ProjCreate, ProjShow} from './projects';
import {BidList} from './bids';
import {SkillList, SkillCreate} from './skills';
import {ProjSkillList} from './proj-skills'
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
          customReducers={{profile, client, project, bid}}
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
                    remove={Delete}
          />
          <Resource name={'skills'}
                    list={SkillList}
                    create={SkillCreate}
          />
          <Resource name={'proj-skills'}
                    list={ProjSkillList}
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