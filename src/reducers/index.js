import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import loginReducer from "../screens/Login/reducer";

import authzReducer from "../utils/authorization/reducer";

import navReducer from "../utils/navigation/reducers";

export default combineReducers({
  form: formReducer,
  loginReducer,
  authzReducer,
  navReducer
});
