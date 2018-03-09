import {call, put, takeLatest } from 'redux-saga/effects'
import {handleApiErrors} from '../lib/api-errors'
import {
  PROFILE_UPDATING,
  PROFILE_UPDATE_ERROR,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_GETTING,
  PROFILE_GET_ERROR,
  PROFILE_GET_SUCCESS
} from "./constants";

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

function pGetApi(username) {
  return fetch(profileUrl + '/' + username, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
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
    const token = JSON.parse(localStorage.getItem('token'));
    const username = token.username;
    let body = {};
    if (email.email !== undefined) body['email'] = email.email;
    if (email.password !== undefined) body['password'] = email.password;
    if (email.firstName !== undefined) body['first_name'] = email.firstName;
    if (email.lastName !== undefined) body['last_name'] = email.lastName;
    if (email.aboutMe !== undefined) body['about_me'] = email.aboutMe;

    console.log(body);

    const response = yield call(pUpdApi, username, body);
    yield put({type: PROFILE_UPDATE_SUCCESS, response})
  } catch(error){
    yield put({type: PROFILE_UPDATE_ERROR, error})
  }
}

function* pGetFlow(action) {
  try{
    const {username} = action;
    const response = yield call(pGetApi, username);
    console.log(response);
    yield put({type: PROFILE_GET_SUCCESS, response});
  } catch(error) {
    yield put({type: PROFILE_GET_ERROR, error})
  }
}

export function* pUpdWatcher() {
  yield takeLatest(PROFILE_UPDATING, pUpdFlow)
}


export  function* pGetWatcher() {
  yield takeLatest(PROFILE_GETTING, pGetFlow)
}

