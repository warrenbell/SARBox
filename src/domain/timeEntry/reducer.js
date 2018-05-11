const INITIAL_STATE = {
  timeEntries: null
};

export default (state = INITIAL_STATE, action) => {
  //console.log(action);

  switch (action.type) {
    case "SET_TIME_ENTRIES":
      return { ...state, timeEntries: [...action.timeEntries] };
    case "CLEAR_TIME_ENTRIES":
      return { ...state, timeEntries: null };
    default:
      return {...state};
  }
};
