import {call, put, takeLatest } from 'redux-saga/effects'
import {handleApiErrors} from '../../lib/api-errors'
import {PROJECT_SET} from "./constants";


function *setProj(action){
  console.log("Set Project");

}

function* projSetWatcher() {
  yield takeLatest(PROJECT_SET, setProj);
}