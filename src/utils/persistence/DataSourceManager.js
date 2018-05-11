import PouchDB from 'pouchdb-react-native';
PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(require('pouchdb-live-find'));

// Debugging uncomment
// PouchDB.debug.enable( "pouchdb:find" );

import { setInitialAuthorizations } from "../authorization/initialize";

import { setUser } from "../../actions";

/*
// options for
remote.replicate.to(local, {
  filter: 'replication/byUsername',
  query_params: {username: 'org.couchdb.user:' + username}
});
*/

class DataSourceManager {

  static instance: null;

  static getInstance() {
    if(this.instance == null) {
      this.instance = new DataSourceManager();
    }
    return this.instance;
  }

  // ##### User DB #####

  _userLocalDB: undefined;
  // _userRemoteDB = {username:"username", db:db}
  _userRemoteDB: undefined;
  _userSynch: undefined;
  _userLiveFind: undefined;

  _getUsernameAsHex = username => {
    let hex = '';
  	for(var i = 0; i < username.length; i++) {
  		hex += '' + username.charCodeAt(i).toString(16);
  	}
  	return hex;
  }

  getUserLocalDB() {
    if(this._userLocalDB === undefined) {
      this._userLocalDB = new PouchDB('user');
    }
    return this._userLocalDB;
  }

  resetUserLocalDB() {
    this._userLocalDB = undefined;
  }

  getUserRemoteDB(username, password) {
    if(this._userRemoteDB === undefined || (this._userRemoteDB && this._userRemoteDB.username !== username)) {
      this._userRemoteDB = {};
      this._userRemoteDB.db = new PouchDB('https://j8d563j.sarbox.info:6984/userdb-' + this._getUsernameAsHex(username), {
        ajax: {
          cache: false,
          timeout: 10000
        },
        auth: {
          username: username,
          password: password
        }
      });
      this._userRemoteDB.username = username;
      this._userRemoteDB.db.setMaxListeners(20);
    }
    return this._userRemoteDB.db;
  }

  resetUserRemoteDB() {
    this._userRemoteDB = undefined;
  }

  set userSynch(synch) {
    this._userSynch = synch;
  }

  cancelUserSynch() {
    if(this._userSynch) {
      this._userSynch.cancel();
      this._userSynch = undefined;
    }
  }

  set userLiveFind(liveFind) {
    this._userLiveFind = liveFind;
  }

  cancelUserLiveFind() {
    if(this._userLiveFind) {
      this._userLiveFind.cancel();
      this._userLiveFind = undefined;
    }
  }

  // ##### Time Entries DB #####

  _timeEntriesLocalDB: undefined;
  _timeEntriesRemoteDB: undefined;
  // _timeEntriesRemoteDB = {username:"username", db:db}
  _timeEntriesSynch: undefined;
  _timeEntriesLiveFind: undefined;

  getTimeEntriesLocalDB() {
    if(this._timeEntriesLocalDB === undefined) {
      this._timeEntriesLocalDB = new PouchDB('time_entries');
    }
    return this._timeEntriesLocalDB;
  }

  resetTimeEntriesLocalDB() {
    this._timeEntriesLocalDB = undefined;
  }

  getTimeEntriesRemoteDB(username, password) {
    if(this._timeEntriesRemoteDB === undefined || (this._timeEntriesRemoteDB && this._timeEntriesRemoteDB.username !== username)) {
      this._timeEntriesRemoteDB = {};
      this._timeEntriesRemoteDB.db = new PouchDB('https://j8d563j.sarbox.info:6984/time_entries', {
        ajax: {
          cache: false,
          timeout: 10000
        },
        auth: {
          username: username,
          password: password
        }
      });
      this._timeEntriesRemoteDB.username = username;
      this._timeEntriesRemoteDB.db.setMaxListeners(20);
    }
    return this._timeEntriesRemoteDB.db;
  }

  resetTimeEntriesRemoteDB() {
    this._timeEntriesRemoteDB = undefined;
  }

  set timeEntriesSynch(synch) {
    this._timeEntriesSynch = synch;
  }

  cancelTimeEntriesSynch() {
    if(this._timeEntriesSynch) {
      this._timeEntriesSynch.cancel();
      this._timeEntriesSynch = undefined;
    }
  }

  set timeEntriesLiveFind(liveFind) {
    this._timeEntriesLiveFind = liveFind;
  }

  cancelTimeEntriesLiveFind() {
    if(this._timeEntriesLiveFind) {
      this._timeEntriesLiveFind.cancel();
      this._timeEntriesLiveFind = undefined;
    }
  }

  // ##### Teams DB #####

  _teamsLocalDB: undefined;
  _teamsRemoteDB: undefined;
  // _teamsRemoteDB = {username:"username", db:db}
  _teamsSynch: undefined;
  _teamsLiveFind: undefined;

  getTeamsLocalDB() {
    if(this._teamsLocalDB === undefined) {
      this._teamsLocalDB = new PouchDB('teams');
    }
    return this._teamsLocalDB;
  }

  resetTeamsLocalDB() {
    this._teamsLocalDB = undefined;
  }

  getTeamsRemoteDB(username, password) {
    if(this._teamsRemoteDB === undefined || (this._teamsRemoteDB && this._teamsRemoteDB.username !== username)) {
      this._teamsRemoteDB = {};
      this._teamsRemoteDB.db = new PouchDB('https://j8d563j.sarbox.info:6984/teams', {
        ajax: {
          cache: false,
          timeout: 10000
        },
        auth: {
          username: username,
          password: password
        }
      });
      this._teamsRemoteDB.username = username;
      this._teamsRemoteDB.db.setMaxListeners(20);
    }
    return this._teamsRemoteDB.db;
  }

  resetTeamsRemoteDB() {
    this._teamsRemoteDB = undefined;
  }

  set teamsSynch(synch) {
    this._teamsSynch = synch;
  }

  cancelTeamsSynch() {
    if(this._teamsSynch) {
      this._teamsSynch.cancel();
      this._teamsSynch = undefined;
    }
  }

  set teamsLiveFind(liveFind) {
    this._teamsLiveFind = liveFind;
  }

  cancelTeamsLiveFind() {
    if(this._teamsLiveFind) {
      this._teamsLiveFind.cancel();
      this._teamsLiveFind = undefined;
    }
  }

}

export default DataSourceManager;
