import SignupSaga from './signup/sagas'
import LoginSaga from './login/sagas'
import {pUpdWatcher, pGetWatcher} from './dashboard/profile/sagas'
import ClientSaga from './client/sagas'


export default function* IndexSage(){
  yield[
    SignupSaga(),
    LoginSaga(),
    pUpdWatcher(),
    pGetWatcher(),
    ClientSaga()
  ]
}