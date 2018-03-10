import {CLIENT_UNSET} from '../../client/constants'

import history from "../../history";
import {put, takeLatest} from "redux-saga/effects";
import {unsetClient} from "../../client/actions";

function* logout(){
  console.log('here I am');
  localStorage.removeItem('token');
  history.push('/login');
}

function* logoutWatcher(){
  yield takeLatest(CLIENT_UNSET, logout)
}

export default logoutWatcher;
