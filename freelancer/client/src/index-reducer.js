import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import client from './client/reducer'
import signup from './signup/reducer'
import login from './login/reducer'
import profile from './profile/reducer'
import account from './profile/account'

const IndexReducer = combineReducers({
  form,
  client,
  signup,
  login,
  profile,
  account
});
export default IndexReducer;