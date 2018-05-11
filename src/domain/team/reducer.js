const INITIAL_STATE = {
  teams: [],
  currentTeam: 'sgsar'
};

export default (state = INITIAL_STATE, action) => {
  //console.log(action);

  switch (action.type) {
    case "SET_TEAMS":
      return { ...state, teams: [ ...action.teams ] };
    case "CLEAR_TEAMS":
      return { ...state, teams: [] };
    case "SET_CURRENT_TEAM":
      return { ...state, currentTeam: action.currentTeam };
    case "CLEAR_CURRENT_TEAM":
      return { ...state, currentTeam: '' };
    default:
      return { ...state };
  }
};

/*
{
"code": "sgsar",
"name": "San Gorgonio Search and Rescue",
"settings": {
  "timeEntryHourTypes": [
    "Mission",
    "Training",
    "Meeting",
    "Administrative",
    "Fund Raising",
    "Exercise",
    "Other"
  ]
},
"teamEvents": [
  {
    "eventName": "Joshua Tree Search id 134",
    "date": "2018-02-04",
    "type": "Mission"
  },
  {
    "eventName": "San G Sloan Search id 136",
    "date": "2018-01-07",
    "type": "Mission"
  },
  {
    "eventName": "Highland Search id 137",
    "date": "2017-07-04",
    "type": "Mission"
  },
  {
    "eventName": "Special Rope Training",
    "date": "2018-11-23",
    "type": "Training"
  },
  {
    "eventName": "Heletac Training",
    "date": "2018-12-19",
    "type": "Training"
  }
]
}
*/
