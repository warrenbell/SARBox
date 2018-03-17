import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "../utils/authentication/reducer";

import authzReducer from "../utils/authorization/reducer";

import navReducer from "../utils/navigation/reducer";

export default combineReducers({
  form: formReducer,
  authReducer,
  authzReducer,
  navReducer
});
