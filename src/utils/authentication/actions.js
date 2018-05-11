import {initialize} from 'redux-form';

// couchDB web Admin
// https://j8d563j.sarbox.info:6984/_utils/

import DataSourceManager from '../persistence/DataSourceManager';

import { setInitialAuthorizations } from "../authorization/initialize";

import { setUser } from "../../actions";

// NOT used anymore
import axios from 'axios';

// NOT used any more
const couchDbMainAuth = axios.create({
  baseURL: "https://j8d563j.sarbox.info:6984/_users",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  withCredentials: true
});

// Asynchronous action with redux-thunk returns a function instead of a redux action object
export const loginUser = (username, password, formResolve, formReject) => {
  return (dispatch) => {
    handleLoginUser(username, password, dispatch, formResolve, formReject);
  };
};

export const logoutUser = () => {
  ////console.log("logoutUser CALLED");
  return (dispatch) => {
    //dispatch({ type: "NAV_LOGOUT_RESET" });
    DataSourceManager.getInstance().resetUserRemoteDB();
    DataSourceManager.getInstance().cancelUserSynch();
    DataSourceManager.getInstance().cancelUserLiveFind();
    DataSourceManager.getInstance().resetTimeEntriesRemoteDB();
    DataSourceManager.getInstance().cancelTimeEntriesSynch();
    DataSourceManager.getInstance().cancelTimeEntriesLiveFind();
    DataSourceManager.getInstance().resetTeamsRemoteDB();
    DataSourceManager.getInstance().cancelTeamsSynch();
    DataSourceManager.getInstance().cancelTeamsLiveFind();
    dispatch({ type: "LOGOUT_USER" });
    dispatch({ type: "CLEAR_USER" });
    dispatch({ type: "CLEAR_AUTHORIZATIONS" });
    dispatch({ type: "CLEAR_PERMISSIONS" });
    dispatch({ type: "CLEAR_TIME_ENTRIES" });
    dispatch({ type: "CLEAR_TEAMS" });
  };
};

const handleLoginUser = (username, password, dispatch, formResolve, formReject) => {
  const userLocalDB = DataSourceManager.getInstance().getUserLocalDB();
  const userRemoteDB = DataSourceManager.getInstance().getUserRemoteDB(username, password);
  userLocalDB.replicate.from(userRemoteDB, {
    timeout: 20000
  }).on('change', info => {
    // handle replicate change
    //console.log("userLocalDB.replicate.from on change:\n" + JSON.stringify(info, null, 2));
  }).on('paused', info => {
    // replication paused (e.g. replication up to date, user went offline)
    //console.log("userLocalDB.replicate.from on paused:\n" + JSON.stringify(info, null, 2));
  }).on('active', info => {
    // replicate resumed (e.g. new changes replicating, user went back online)
    //console.log("userLocalDB.replicate.from on active:\n" + JSON.stringify(info, null, 2));
  }).on('denied', error => {
    // a document failed to replicate (e.g. due to permissions)
    //console.log("userLocalDB.replicate.from on denied:\n" + JSON.stringify(error, null, 2));
  }).on('complete', info => {
    // handle replicate complete
    //console.log("userLocalDB.replicate.from on complete:\n" + JSON.stringify(info, null, 2));
    handleUserReplicateOnComplete(userLocalDB, userRemoteDB, username, password, dispatch, formResolve, formReject);
  }).on('error', error => {
    // handle replicate error
    // This means that the username and password were wrong
    //console.log("userLocalDB.replicate.from on error:\n" + JSON.stringify(error, null, 2));
    handleLogInError(error, dispatch, formReject);
  }).catch(error => {
    //console.log("userLocalDB.replicate.from catch error:\n" + JSON.stringify(error, null, 2));
    handleLogInError(error, dispatch, formReject);
  });
}

const handleUserReplicateOnComplete = (userLocalDB, userRemoteDB, username, password, dispatch, formResolve, formReject) => {
  userLocalDB.get('org.couchdb.user:' + username)
  .then(user => {
    setUserToReduxStore(user, dispatch);
    dispatch({ type: "LOGIN_USER_SUCCESS" });
    dispatch({ type: "NAV_LOGIN" });
    dispatch(initialize("loginForm"));
    initializeUserLiveFind(userLocalDB, username, dispatch);
    initializeUserSynch(userLocalDB, userRemoteDB, username, dispatch);
    initializeTimeEntriesReplicate(username, password, dispatch);
    initializeTeamsReplicate(username, password, user, dispatch);
    formResolve();
    //console.log("userLocalDB.get then:\n" + JSON.stringify(user, null, 2));
  }).catch(error => {
    //console.log("userLocalDB.get catch error:\n" + JSON.stringify(error, null, 2));
    handleLogInError(error, dispatch, formReject);
  });
}

const initializeUserLiveFind = (userLocalDB, username, dispatch) => {
  // User has been authenticated
  DataSourceManager.getInstance().userLiveFind = userLocalDB.liveFind({
    selector: {
      _id: {$eq: 'org.couchdb.user:' + username}
    },
    aggregate: true
  }).on('update', (update, [ user ]) => {
    setUserToReduxStore(user, dispatch);
    //console.log("userLocalDB.liveFind on update:\n" + JSON.stringify(update, null, 2));
    //console.log("userLocalDB.liveFind user:\n" + JSON.stringify(user, null, 2));
  }).on('ready', info => {
    //console.log("userLocalDB.liveFind on ready:\n" + JSON.stringify(info, null, 2));
  }).on('cancelled', info => {
    //console.log("userLocalDB.liveFind on cancelled:\n" + JSON.stringify(info, null, 2));
  }).on('error', error => {
    //console.log("userLocalDB.liveFind on error:\n" + JSON.stringify(error, null, 2));
  });
}

const initializeUserSynch = (userLocalDB, userRemoteDB, username, dispatch) => {
  DataSourceManager.getInstance().userSynch = userLocalDB.sync(userRemoteDB, {
    live: true,
    retry: true
  }).on('change', info => {
    // handle change we have a new user
    //console.log("userLocalDB.sync on change:\n" + JSON.stringify(info, null, 2));
  }).on('paused', error => {
    // replication paused (e.g. replication up to date, user went offline)
    //console.log("userLocalDB.sync on paused:\n" + JSON.stringify(error, null, 2));
  }).on('active', info => {
    // replicate resumed (e.g. new changes replicating, user went back online)
    //console.log("userLocalDB.sync on active:\n" + JSON.stringify(info, null, 2));
  }).on('denied', error => {
    // a document failed to replicate (e.g. due to permissions)
    //console.log("userLocalDB.sync on denied:\n" + JSON.stringify(error, null, 2));
  }).on('complete', info => {
    // handle complete
    //console.log("userLocalDB.sync on complete:\n" + JSON.stringify(info, null, 2));
  }).on('error', error => {
    // handle error
    //console.log("userLocalDB.sync on error:\n" + JSON.stringify(error, null, 2));
  });
}

const handleLogInError = (error, dispatch, formReject) => {
  let loginError = ''
  if (error.error && error.error === 'unauthorized') {
    loginError = "Username or Password is Incorrect";
  } else if(error.message && error.message.startsWith('getCheckpoint rejected')) {
    loginError = "Can not Login when Offline";
  } else {
    loginError = "Login Failed";
  }
  dispatch({ type: "LOGIN_USER_FAIL", loginError: loginError });
  DataSourceManager.getInstance().resetUserRemoteDB();
  DataSourceManager.getInstance().cancelUserSynch();
  DataSourceManager.getInstance().cancelUserLiveFind();
  formReject({ loginError });
}

const setUserToReduxStore = (user, dispatch) => {
  dispatch({ type: "RESET_PERMISSIONS", permissions: user.permissions });
  dispatch(setInitialAuthorizations());
  dispatch(setUser(user));
}

// Time Entries Set-up

const initializeTimeEntriesReplicate = (username, password, dispatch) => {
  const timeEntriesLocalDB = DataSourceManager.getInstance().getTimeEntriesLocalDB();
  const timeEntriesRemoteDB = DataSourceManager.getInstance().getTimeEntriesRemoteDB(username, password);
  timeEntriesLocalDB.replicate.from(timeEntriesRemoteDB, {
    timeout: 20000,
    filter: 'replication/byUsername',
    query_params: {username: 'org.couchdb.user:' + username }
  }).on('change', info => {
    // handle replicate change
    //console.log("timeEntriesLocalDB.replicate.from on change:\n" + JSON.stringify(info, null, 2));
  }).on('paused', error => {
    // replication paused (e.g. replication up to date, user went offline)
    //console.log("timeEntriesLocalDB.replicate.from on paused:\n" + JSON.stringify(error, null, 2));
  }).on('active', info => {
    // replicate resumed (e.g. new changes replicating, user went back online)
    //console.log("timeEntriesLocalDB.replicate.from on active:\n" + JSON.stringify(info, null, 2));
  }).on('denied', error => {
    // a document failed to replicate (e.g. due to permissions)
    //console.log("timeEntriesLocalDB.replicate.from on denied:\n" + JSON.stringify(error, null, 2));
  }).on('complete', info => {
    // handle replicate complete
    //console.log("timeEntriesLocalDB.replicate.from on complete:\n" + JSON.stringify(info, null, 2));
    initializeTimeEntriesLiveFind(timeEntriesLocalDB, username, dispatch);
    initializeTimeEntriesSynch(timeEntriesLocalDB, timeEntriesRemoteDB, username, dispatch);
  }).on('error', error => {
    // handle replicate error
    // Usually this means that the username and password were wrong
    //console.log("timeEntriesLocalDB.replicate.from on error:\n" + JSON.stringify(error, null, 2));
    //handleUserReplicateOnError(error, dispatch, formReject);
  }).catch(error => {
    //handleUserReplicateOnError(error, dispatch, formReject);
    //console.log("timeEntriesLocalDB.replicate.from catch error:\n" + JSON.stringify(error, null, 2));
  });
}

const initializeTimeEntriesLiveFind = (timeEntriesLocalDB, username, dispatch) => {
  DataSourceManager.getInstance().timeEntriesLiveFind = timeEntriesLocalDB.liveFind({
    selector: {
      username: {$eq: 'org.couchdb.user:' + username},
      date: {$gte: null}
    },
    sort: [{username: 'desc'}, {date:'desc'}],
    aggregate: true
  }).on('update', (update, timeEntries) => {
    //console.log("timeEntriesLocalDB.liveFind on update:\n" + JSON.stringify(update, null, 2));
    //console.log("timeEntriesLocalDB.liveFind timeEntries:\n" + JSON.stringify(timeEntries, null, 2));
    dispatch({ type: "SET_TIME_ENTRIES", timeEntries: timeEntries });
  }).on('ready', info => {
    //console.log("timeEntriesLocalDB.liveFind on ready:\n" + JSON.stringify(info, null, 2));
  }).on('cancelled', info => {
    //console.log("timeEntriesLocalDB.liveFind on cancelled:\n" + JSON.stringify(info, null, 2));
  }).on('error', error => {
    //console.log("timeEntriesLocalDB.liveFind on error:\n" + JSON.stringify(error, null, 2));
  });
}

const initializeTimeEntriesSynch = (timeEntriesLocalDB, timeEntriesRemoteDB, username, dispatch) => {
  DataSourceManager.getInstance().timeEntriesSynch = timeEntriesLocalDB.sync(timeEntriesRemoteDB, {
    live: true,
    retry: true,
    filter: 'replication/byUsername',
    query_params: {username: 'org.couchdb.user:' + username }
  }).on('change', info => {
    // handle change we have a new user
    //console.log("timeEntriesLocalDB.sync on change:\n" + JSON.stringify(info, null, 2));
    //getTimeEntriesFromLocalDB(timeEntriesLocalDB, username, dispatch);
  }).on('paused', info => {
    // replication paused (e.g. replication up to date, user went offline)
    //console.log("timeEntriesLocalDB.sync on paused:\n" + JSON.stringify(info, null, 2));
  }).on('active', info => {
    // replicate resumed (e.g. new changes replicating, user went back online)
    //console.log("timeEntriesLocalDB.sync on active:\n" + JSON.stringify(info, null, 2));
  }).on('denied', error => {
    // a document failed to replicate (e.g. due to permissions)
    //console.log("timeEntriesLocalDB.sync on denied:\n" + JSON.stringify(error, null, 2));
  }).on('complete', info => {
    // handle complete
    //console.log("timeEntriesLocalDB.sync on complete:\n" + JSON.stringify(info, null, 2));
  }).on('error', function (error) {
    // handle error
    //console.log("timeEntriesLocalDB.sync on error:\n" + JSON.stringify(error, null, 2));
  });
}

// Teams set-up

const initializeTeamsReplicate = (username, password, user, dispatch) => {
  ////console.log("user.teams:\n" + JSON.stringify(user.teams, null, 2));
  const teamsLocalDB = DataSourceManager.getInstance().getTeamsLocalDB();
  const teamsRemoteDB = DataSourceManager.getInstance().getTeamsRemoteDB(username, password);
  teamsLocalDB.replicate.from(teamsRemoteDB, {
    timeout: 20000,
    filter: 'replication/byUserTeams',
    query_params: { teams: user.teams }
  }).on('change', info => {
    // handle replicate change
    //console.log("teamsLocalDB.replicate.from on change:\n" + JSON.stringify(info, null, 2));
  }).on('paused', error => {
    // replication paused (e.g. replication up to date, user went offline)
    //console.log("teamsLocalDB.replicate.from on paused:\n" + JSON.stringify(error, null, 2));
  }).on('active', info => {
    // replicate resumed (e.g. new changes replicating, user went back online)
    //console.log("teamsLocalDB.replicate.from on active:\n" + JSON.stringify(info, null, 2));
  }).on('denied', error => {
    // a document failed to replicate (e.g. due to permissions)
    //console.log("teamsLocalDB.replicate.from on denied:\n" + JSON.stringify(error, null, 2));
  }).on('complete', info => {
    // handle replicate complete
    //console.log("teamsLocalDB.replicate.from on complete:\n" + JSON.stringify(info, null, 2));
    initializeTeamsLiveFind(user.teams, teamsLocalDB, dispatch);
  }).on('error', error => {
    // handle replicate error
    // Usually this means that the username and password were wrong
    //console.log("teamsLocalDB.replicate.from on error:\n" + JSON.stringify(error, null, 2));
    //handleUserReplicateOnError(error, dispatch, formReject);
  }).catch(error => {
    //handleUserReplicateOnError(error, dispatch, formReject);
    //console.log("teamsLocalDB.replicate.from catch error:\n" + JSON.stringify(error, null, 2));
  });
}

const getTeamsSelector = (teams) => {
  const teamsSelector = [];
  for(var i = 0; i < teams.length; i++) {
    teamsSelector.push({_id: 'team-' + teams[i]})
  }
  return teamsSelector;
}

const initializeTeamsLiveFind = (teams, teamsLocalDB, dispatch) => {
  const teamsSelector = getTeamsSelector(teams);
  DataSourceManager.getInstance().teamsLiveFind = teamsLocalDB.liveFind({
    selector: {
      $or: teamsSelector
    },
    aggregate: true
  }).on('update', (update, teams) => {
    //console.log("teamsLocalDB.liveFind on update:\n" + JSON.stringify(update, null, 2));
    //console.log("teamsLocalDB.liveFind teams:\n" + JSON.stringify(teams, null, 2));
    dispatch({ type: "SET_TEAMS", teams });
  }).on('ready', info => {
    //console.log("teamsLocalDB.liveFind on ready:\n" + JSON.stringify(info, null, 2));
  }).on('cancelled', info => {
    //console.log("teamsLocalDB.liveFind on cancelled:\n" + JSON.stringify(info, null, 2));
  }).on('error', error => {
    //console.log("teamsLocalDB.liveFind on error:\n" + JSON.stringify(error, null, 2));
  });
}

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
