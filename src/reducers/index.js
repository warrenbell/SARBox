import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import loginReducer from "../screens/Login/reducer";

export default combineReducers({
  form: formReducer,
  loginReducer
});
