import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../screens/Home/reducer";

import loginReducer from "../screens/Login/reducer";

export default combineReducers({
  form: formReducer,
  homeReducer,
  loginReducer
});
