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

var couchDbMainAuth = axios.create({
  baseURL: "https://j8d563j.sarbox.info:6984/_users",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  withCredentials: true
});

// This resets the navigation stack with only Login at start
const navigateToLogin = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});

// Asynchronous action with redux-thunk returns a function instead of a redux action object
export const loginUser = (email, password, navigation, formResolve, formReject) => {
  console.warn("loginUser CALLED");
  return (dispatch) => {
    couchDbMainAuth.get("/org.couchdb.user:" + email.toLowerCase(), {
      auth: {
        username: email.toLowerCase(),
        password: password
      }
    })
    .then(response => {
      console.warn("USER:\n" + JSON.stringify(response, null, 2));
      loginUserSuccess(dispatch, response, navigation);
      formResolve();
    }).catch(error => {
      console.warn("ERROR:\n" + JSON.stringify(error, null, 2));
      loginUserFail(dispatch, "Login Error");
      formReject("Login Error");
    });
  };
};

// Move this to SignUp folder action.js
// Asynchronous action with redux-thunk returns a function instead of a redux action object
// Second arg to axios.put or axios.post is data in body
export const createUser = (email, password, navigation, formResolve, formReject) => {
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
      loginUserSuccess(dispatch, response, navigation);
      resolve();
    }).catch(error => {
      console.warn("ERROR:\n" + JSON.stringify(error, null, 2));
      loginUserFail(dispatch, "Login Error");
      reject("Login Error");
    });
  };
};

const loginUserFail = (dispatch, loginError) => {
  //console.warn("ERROR:\n" + JSON.stringify(loginError, null, 2));
  dispatch({ type: "LOGIN_USER_FAIL", payload: loginError });
  //throw new SubmissionError({ password: 'Wrong password damit', _error: loginError });
};

const loginUserSuccess = (dispatch, user, navigation) => {
  //console.warn("USER:\n" + JSON.stringify(user, null, 2));
  dispatch({ type: "LOGIN_USER_SUCCESS", payload: user });
  // reinitialize redux form
  dispatch(initialize('login', {}));
  navigation.navigate("Overview");
  //Actions.main();
};

export const logoutUser = (navigation) => {
  //console.warn("logoutUser CALLED");
  navigation.dispatch(navigateToLogin);
  return {
    type: "LOGOUT_USER",
    payload: {}
  };
};
