import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import client from './client/reducer'
import signup from './signup/reducer'
import login from './login/reducer'
import profile from './dashboard/profile/reducer'
import account from './dashboard/profile/account'


const IndexReducer = combineReducers({
  form,
  client,
  signup,
  login,
  profile,
  account,
});
export default IndexReducer;