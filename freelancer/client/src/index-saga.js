import SignupSaga from './signup/sagas'
import LoginSaga from './login/sagas'
import profileSaga from './dashboard/profile/sagas'
import ClientSaga from './client/sagas'


export default function* IndexSage(){
  yield[
    SignupSaga(),
    LoginSaga(),
    profileSaga(),
    ClientSaga()
  ]
}