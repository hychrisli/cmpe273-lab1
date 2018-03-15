import {call, put, takeLatest } from 'redux-saga/effects'
import {handleApiErrors} from '../../lib/api-errors'
import {
  PROFILE_UPDATING,
  PROFILE_UPDATE_ERROR,
  PROFILE_UPDATE_SUCCESS,
} from "./constants";
import {setClient} from "../../client/actions";

const profileUrl = `${process.env.REACT_APP_API_URL}/users`;


function pUpdApi(username, body){
  console.log(body);
  return fetch(profileUrl + '/' + username, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {throw error})
}


function* pUpdFlow(action){
  try{
    console.log(action);
    const {email} = action;
    let token = JSON.parse(localStorage.getItem('token'));
    const username = token.username;
    let body = {};
    if (email.email !== undefined) body['email'] = email.email;
    if (email.password !== undefined) body['password'] = email.password;
    if (email.firstName !== undefined) body['first_name'] = email.firstName;
    if (email.lastName !== undefined) body['last_name'] = email.lastName;
    if (email.aboutMe !== undefined) body['about_me'] = email.aboutMe;

    console.log(body);
    token = yield call(pUpdApi, username, body);
    localStorage.setItem('token', JSON.stringify(token));
    yield put(setClient(token));
    yield put({type: PROFILE_UPDATE_SUCCESS});
  } catch(error){
    yield put({type: PROFILE_UPDATE_ERROR, error});
  }
}

function* pUpdWatcher() {
  yield takeLatest(PROFILE_UPDATING, pUpdFlow);
}

export default pUpdWatcher;