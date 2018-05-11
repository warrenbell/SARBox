import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "../utils/authentication/reducer";

import authzReducer from "../utils/authorization/reducer";

import navReducer from "../utils/navigation/reducer";

import userReducer from "../domain/user/reducer";

import timeEntryReducer from "../domain/timeEntry/reducer";

import teamReducer from "../domain/team/reducer";

export default combineReducers({
  form: formReducer,
  authReducer,
  authzReducer,
  navReducer,
  userReducer,
  timeEntryReducer,
  teamReducer
});
