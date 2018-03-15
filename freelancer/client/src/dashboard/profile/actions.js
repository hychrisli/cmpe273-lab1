import {PROFILE_UPDATING} from "./constants";

export const profileUpdate = (email, password, firstName, lastName, aboutMe) => ({
  type: PROFILE_UPDATING,
  email,
  password,
  firstName,
  lastName,
  aboutMe
});