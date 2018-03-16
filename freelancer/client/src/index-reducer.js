import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import client from './client/reducer'
import signup from './signup/reducer'
import login from './login/reducer'
import profile from './dashboard/profile/reducer'
import project from './dashboard/projects/reducer'

const IndexReducer = combineReducers({
  form,
  client,
  signup,
  login,
  profile,
  project
});
export default IndexReducer;