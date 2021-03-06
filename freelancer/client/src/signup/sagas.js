import {call, put, takeLatest } from 'redux-saga/effects'
import {handleApiErrors} from '../lib/api-errors'
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from "./constants";

const signupUrl = `${process.env.REACT_APP_API_URL}/users`;

function signupApi(email, username, password){


  return fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, username, password}),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {throw error})
}

function* signupFlow(action){
  try{
    const {email, username, password} = action;
    const response = yield call(signupApi, email, username,  password);
    yield put({type: SIGNUP_SUCCESS, response});
  } catch(error){
    yield put({type: SIGNUP_ERROR, error});
  }
}

function* signupWatcher() {
  yield takeLatest(SIGNUP_REQUESTING, signupFlow);
}

export default signupWatcher;