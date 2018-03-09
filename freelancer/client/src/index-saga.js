import SignupSaga from './signup/sagas'
import LoginSaga from './login/sagas'
import {pUpdWatcher, pGetWatcher} from './profile/sagas'
import LogoutSaga from './logout/sagas'


export default function* IndexSage(){
  yield[
    SignupSaga(),
    LoginSaga(),
    pUpdWatcher(),
    pGetWatcher(),
    LogoutSaga()
  ]
}