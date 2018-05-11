const INITIAL_STATE = {
  user: null
};

export default (state = INITIAL_STATE, action) => {
  //console.log(action);

  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    case "CLEAR_USER":
      console.warn("CLEAR_USER called");
      return { ...state, user: null };
    default:
      return {...state};
  }
};
