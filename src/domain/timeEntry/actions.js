import DataSourceManager from '../../utils/persistence/DataSourceManager';

import moment from 'moment';

export const deleteTimeEntry = (timeEntry) => {
  return (dispatch) => {
    const timeEntriesLocalDB = DataSourceManager.getInstance().getTimeEntriesLocalDB();
    timeEntry._deleted = true;
    timeEntriesLocalDB.put(
      timeEntry
    ).then(response => {
      console.log("deleteTimeEntry timeEntriesLocalDB.put response:\n" + JSON.stringify(response, null, 2));
    }).catch(error => {
      console.log("deleteTimeEntry timeEntriesLocalDB.put error:\n" + JSON.stringify(error, null, 2));
    });
  }
}


// _id = timeEntry-org.couchdb.user:warren-1234567890
export const upsertTimeEntry = (timeEntry, user) => {
  return (dispatch) => {
    const timeEntriesLocalDB = DataSourceManager.getInstance().getTimeEntriesLocalDB();
    let newTimeEntry;
    if(timeEntry._id) {
      // Update time entry
      newTimeEntry = { ...timeEntry };
    } else {
      // Add new time entry
      newTimeEntry = { ...timeEntry, _id: 'timeEntry-org.couchdb.user:' + user.name + '-' + moment().valueOf(), username: 'org.couchdb.user:' + user.name, team: user.teams[0] };
    }
    // Update time entry
    timeEntriesLocalDB.put(
      newTimeEntry
    ).then(response => {
      // handle response
      console.log("upsertTimeEntry timeEntriesLocalDB.put response:\n" + JSON.stringify(response, null, 2));
    }).catch(error => {
      console.log("upsertTimeEntry timeEntriesLocalDB.put error:\n" + JSON.stringify(error, null, 2));
    });
  };
};

/* Example of doc in time_entries DB
{
  "_id": "e332b2def2b6100f38559cae6501bd8c",
  "_rev": "1-dbfc79f55af0d504b53fc19442aac913",
  "username": "org.couchdb.user:shane",
  "team": "sgsar",
  "type": "Mission",
  "note": "San G hiker rescue today",
  "date": "2018-02-05",
  "miles": 7,
  "hours": 8
}
*/
