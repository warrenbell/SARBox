import {initialize} from 'redux-form';

// couchDB web Admin
// https://j8d563j.sarbox.info:6984/_utils/

import { setInitialAuthorizations } from "../authorization/initialize";

import axios from 'axios';

var couchDbMainAuth = axios.create({
  baseURL: "https://j8d563j.sarbox.info:6984/_users",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  withCredentials: true
});

// Asynchronous action with redux-thunk returns a function instead of a redux action object
export const loginUser = (username, password, formResolve, formReject) => {
  //console.warn("loginUser CALLED");
  return (dispatch) => {
    couchDbMainAuth.get("/org.couchdb.user:" + username.toLowerCase(), {
      auth: {
        username: username.toLowerCase(),
        password: password
      }
    }).then(response => {
      //console.warn("RESPONSE:\n" + JSON.stringify(response, null, 2));
      const { data } = response;
      dispatch({ type: "RESET_PERMISSIONS", permissions: data.permissions });
      dispatch(setInitialAuthorizations());
      dispatch({ type: "LOGIN_USER_SUCCESS", user: data });
      dispatch({ type: "NAV_LOGIN" });
      dispatch(initialize("loginForm"));
      formResolve(response);
    }).catch(error => {
      //console.warn("ERROR:\n" + JSON.stringify(error, null, 2));
      let loginError = ''
      if (error.response.data.error && error.response.data.error === 'unauthorized') {
        loginError = "Username or Password is Incorrect";
      } else {
        loginError = "Login Failed";
      }
      dispatch({ type: "LOGIN_USER_FAIL", loginError: loginError });
      formReject({ loginError });
    });
  };
};

export const logoutUser = () => {
  //console.warn("logoutUser CALLED");
  return (dispatch) => {
    dispatch({ type: "LOGOUT_USER" });
    dispatch({ type: "CLEAR_AUTHORIZATIONS" });
    dispatch({ type: "CLEAR_PERMISSIONS" });
    dispatch({ type: "NAV_LOGOUT_RESET" });
  };
};

/* response object success from CouchDB using axios:
{
  "data": {
    "_id": "org.couchdb.user:warren@1.com",
    "_rev": "3-f03fcb9e84b4e8fb610d37c56c5d73d8",
    "name": "warren@1.com",
    "roles": [
      "guest"
    ],
    "type": "user",
    "team": "sgsar",
    "password_scheme": "pbkdf2",
    "iterations": 10,
    "derived_key": "a62a2b7d52391427b2eca4bb09027bd80db8610a",
    "salt": "f1de697d305a803fe432f30f5972c7a9"
  },
  "status": 200,
  "headers": {
    "server": "CouchDB/2.1.1 (Erlang OTP/20)",
    "cache-control": "must-revalidate",
    "content-type": "application/json",
    "date": "Sat, 10 Mar 2018 03:32:50 GMT",
    "x-couch-request-id": "fccbbf1c39",
    "content-length": "295",
    "x-couchdb-body-time": "0",
    "etag": "\"3-f03fcb9e84b4e8fb610d37c56c5d73d8\""
  },
  "config": {
    "transformRequest": {},
    "transformResponse": {},
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "headers": {
      "Accept": "application/json",
      "Authorization": "Basic d2FycmVuQDEuY29tOjExMTExMTExMQ=="
    },
    "method": "get",
    "baseURL": "https://j8d563j.sarbox.info:6984/_users",
    "withCredentials": true,
    "auth": {
      "username": "warren@1.com",
      "password": "111111111"
    },
    "url": "https://j8d563j.sarbox.info:6984/_users/org.couchdb.user:warren@1.com"
  },
  "request": {
    "UNSENT": 0,
    "OPENED": 1,
    "HEADERS_RECEIVED": 2,
    "LOADING": 3,
    "DONE": 4,
    "readyState": 4,
    "status": 200,
    "timeout": 0,
    "withCredentials": true,
    "upload": {},
    "_aborted": false,
    "_hasError": false,
    "_method": "GET",
    "_response": "{\"_id\":\"org.couchdb.user:warren@1.com\",\"_rev\":\"3-f03fcb9e84b4e8fb610d37c56c5d73d8\",\"name\":\"warren@1.com\",\"roles\":[\"guest\"],\"type\":\"user\",\"team\":\"sgsar\",\"password_scheme\":\"pbkdf2\",\"iterations\":10,\"derived_key\":\"a62a2b7d52391427b2eca4bb09027bd80db8610a\",\"salt\":\"f1de697d305a803fe432f30f5972c7a9\"}\n",
    "_url": "https://j8d563j.sarbox.info:6984/_users/org.couchdb.user:warren@1.com",
    "_timedOut": false,
    "_trackingName": "unknown",
    "_incrementalEvents": false,
    "responseHeaders": {
      "Server": "CouchDB/2.1.1 (Erlang OTP/20)",
      "Cache-Control": "must-revalidate",
      "Content-Type": "application/json",
      "Date": "Sat, 10 Mar 2018 03:32:50 GMT",
      "X-Couch-Request-ID": "fccbbf1c39",
      "Content-Length": "295",
      "X-CouchDB-Body-Time": "0",
      "Etag": "\"3-f03fcb9e84b4e8fb610d37c56c5d73d8\""
    },
    "_requestId": null,
    "_headers": {
      "accept": "application/json",
      "authorization": "Basic d2FycmVuQDEuY29tOjExMTExMTExMQ=="
    },
    "_responseType": "",
    "_sent": true,
    "_lowerCaseResponseHeaders": {
      "server": "CouchDB/2.1.1 (Erlang OTP/20)",
      "cache-control": "must-revalidate",
      "content-type": "application/json",
      "date": "Sat, 10 Mar 2018 03:32:50 GMT",
      "x-couch-request-id": "fccbbf1c39",
      "content-length": "295",
      "x-couchdb-body-time": "0",
      "etag": "\"3-f03fcb9e84b4e8fb610d37c56c5d73d8\""
    },
    "_subscriptions": [],
    "responseURL": "https://j8d563j.sarbox.info:6984/_users/org.couchdb.user:warren@1.com"
  }
}*/

/* error object catch from CouchDB using axios:
{
  "config": {
    "transformRequest": {},
    "transformResponse": {},
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "headers": {
      "Accept": "application/json",
      "Authorization": "Basic d2FycmVuQDMuY29tOjEyMzEyMzEyMw=="
    },
    "method": "get",
    "baseURL": "https://j8d563j.sarbox.info:6984/_users",
    "withCredentials": true,
    "auth": {
      "username": "warren@3.com",
      "password": "123123123"
    },
    "url": "https://j8d563j.sarbox.info:6984/_users/org.couchdb.user:warren@3.com"
  },
  "request": {
    "UNSENT": 0,
    "OPENED": 1,
    "HEADERS_RECEIVED": 2,
    "LOADING": 3,
    "DONE": 4,
    "readyState": 4,
    "status": 401,
    "timeout": 0,
    "withCredentials": true,
    "upload": {},
    "_aborted": false,
    "_hasError": false,
    "_method": "GET",
    "_response": "{\"error\":\"unauthorized\",\"reason\":\"Name or password is incorrect.\"}\n",
    "_url": "https://j8d563j.sarbox.info:6984/_users/org.couchdb.user:warren@3.com",
    "_timedOut": false,
    "_trackingName": "unknown",
    "_incrementalEvents": false,
    "responseHeaders": {
      "Server": "CouchDB/2.1.1 (Erlang OTP/20)",
      "Cache-Control": "must-revalidate",
      "Content-Type": "application/json",
      "Date": "Sat, 10 Mar 2018 03:56:48 GMT",
      "X-Couch-Request-ID": "0061739d03",
      "Content-Length": "67",
      "Www-Authenticate": "Basic realm=\"Administrator\"",
      "X-CouchDB-Body-Time": "0"
    },
    "_requestId": null,
    "_headers": {
      "accept": "application/json",
      "authorization": "Basic d2FycmVuQDMuY29tOjEyMzEyMzEyMw=="
    },
    "_responseType": "",
    "_sent": true,
    "_lowerCaseResponseHeaders": {
      "server": "CouchDB/2.1.1 (Erlang OTP/20)",
      "cache-control": "must-revalidate",
      "content-type": "application/json",
      "date": "Sat, 10 Mar 2018 03:56:48 GMT",
      "x-couch-request-id": "0061739d03",
      "content-length": "67",
      "www-authenticate": "Basic realm=\"Administrator\"",
      "x-couchdb-body-time": "0"
    },
    "_subscriptions": [],
    "responseURL": "https://j8d563j.sarbox.info:6984/_users/org.couchdb.user:warren@3.com"
  },
  "response": {
    "data": {
      "error": "unauthorized",
      "reason": "Name or password is incorrect."
    },
    "status": 401,
    "headers": {
      "server": "CouchDB/2.1.1 (Erlang OTP/20)",
      "cache-control": "must-revalidate",
      "content-type": "application/json",
      "date": "Sat, 10 Mar 2018 03:56:48 GMT",
      "x-couch-request-id": "0061739d03",
      "content-length": "67",
      "www-authenticate": "Basic realm=\"Administrator\"",
      "x-couchdb-body-time": "0"
    },
    "config": {
      "transformRequest": {},
      "transformResponse": {},
      "timeout": 0,
      "xsrfCookieName": "XSRF-TOKEN",
      "xsrfHeaderName": "X-XSRF-TOKEN",
      "maxContentLength": -1,
      "headers": {
        "Accept": "application/json",
        "Authorization": "Basic d2FycmVuQDMuY29tOjEyMzEyMzEyMw=="
      },
      "method": "get",
      "baseURL": "https://j8d563j.sarbox.info:6984/_users",
      "withCredentials": true,
      "auth": {
        "username": "warren@3.com",
        "password": "123123123"
      },
      "url": "https://j8d563j.sarbox.info:6984/_users/org.couchdb.user:warren@3.com"
    },
    "request": {
      "UNSENT": 0,
      "OPENED": 1,
      "HEADERS_RECEIVED": 2,
      "LOADING": 3,
      "DONE": 4,
      "readyState": 4,
      "status": 401,
      "timeout": 0,
      "withCredentials": true,
      "upload": {},
      "_aborted": false,
      "_hasError": false,
      "_method": "GET",
      "_response": "{\"error\":\"unauthorized\",\"reason\":\"Name or password is incorrect.\"}\n",
      "_url": "https://j8d563j.sarbox.info:6984/_users/org.couchdb.user:warren@3.com",
      "_timedOut": false,
      "_trackingName": "unknown",
      "_incrementalEvents": false,
      "responseHeaders": {
        "Server": "CouchDB/2.1.1 (Erlang OTP/20)",
        "Cache-Control": "must-revalidate",
        "Content-Type": "application/json",
        "Date": "Sat, 10 Mar 2018 03:56:48 GMT",
        "X-Couch-Request-ID": "0061739d03",
        "Content-Length": "67",
        "Www-Authenticate": "Basic realm=\"Administrator\"",
        "X-CouchDB-Body-Time": "0"
      },
      "_requestId": null,
      "_headers": {
        "accept": "application/json",
        "authorization": "Basic d2FycmVuQDMuY29tOjEyMzEyMzEyMw=="
      },
      "_responseType": "",
      "_sent": true,
      "_lowerCaseResponseHeaders": {
        "server": "CouchDB/2.1.1 (Erlang OTP/20)",
        "cache-control": "must-revalidate",
        "content-type": "application/json",
        "date": "Sat, 10 Mar 2018 03:56:48 GMT",
        "x-couch-request-id": "0061739d03",
        "content-length": "67",
        "www-authenticate": "Basic realm=\"Administrator\"",
        "x-couchdb-body-time": "0"
      },
      "_subscriptions": [],
      "responseURL": "https://j8d563j.sarbox.info:6984/_users/org.couchdb.user:warren@3.com"
    }
  }
}
*/
