import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import client from './client/reducer'
import signup from './signup/reducer'
import login from './login/reducer'
import profile from './dashboard/profile/reducer'

const IndexReducer = combineReducers({
  form,
  client,
  signup,
  login,
  profile,
});
export default IndexReducer;