import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import loginReducer from "../screens/Login/reducer";

import authzReducer from "../utils/authorization/reducer";

export default combineReducers({
  form: formReducer,
  loginReducer,
  authzReducer
});
