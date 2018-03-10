import {PROFILE_UPDATING, PROFILE_GETTING} from "./constants";

export const profileUpdate = (email, password, firstName, lastName, aboutMe) => ({
  type: PROFILE_UPDATING,
  email,
  password,
  firstName,
  lastName,
  aboutMe
});


export const profileGet = (username) => ({
  type: PROFILE_GETTING,
  username,
});