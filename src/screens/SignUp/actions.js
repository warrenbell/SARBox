// This code is incomplete

import {initialize} from 'redux-form';

import { NavigationActions } from "react-navigation";

import axios from 'axios';

var couchDbMainAdmin = axios.create({
  baseURL: "https://j8d563j.sarbox.info:6984",
  headers: {
    "Authorization": "Basic YWRtaW46aEVEZDl1Z1ZSQXFRSHZZWHg5NGU=",
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});

// This resets the navigation stack with only Login at start
const navigateToLogin = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});

// Asynchronous action with redux-thunk returns a function instead of a redux action object
// Second arg to axios.put or axios.post is data in body
export const createUser = (email, password, team, navigation, formResolve, formReject) => {
  console.warn("loginUser CALLED");
  return (dispatch) => {
    couchDbMainAdmin.put("/_users/org.couchdb.user:" + email.toLowerCase(), {
      name: email.toLowerCase(),
      password: password,
      roles: ['guest'],
      type: 'user',
      team: 'sgsar'
    })
    .then(response => {
      console.warn("USER:\n" + JSON.stringify(response, null, 2));
      createUserSuccess(dispatch, response, navigation);
      resolve();
    }).catch(error => {
      console.warn("ERROR:\n" + JSON.stringify(error, null, 2));
      createUserFail(dispatch, "Login Error");
      reject("Login Error");
    });
  };
};

const createUserFail = (dispatch, loginError) => {
  //console.warn("ERROR:\n" + JSON.stringify(loginError, null, 2));
  dispatch({ type: "LOGIN_USER_FAIL", payload: loginError });
  //throw new SubmissionError({ password: 'Wrong password damit', _error: loginError });
};

const createUserSuccess = (dispatch, user, navigation) => {
  //console.warn("USER:\n" + JSON.stringify(user, null, 2));
  dispatch({ type: "LOGIN_USER_SUCCESS", payload: user });
  // reinitialize redux form
  dispatch(initialize('login', {}));
  navigation.dispatch({ type:'NAV_HOME' });
  //Actions.main();
};
