const INITIAL_STATE = {
  loginError: '',
  user: null
};

export default (state = INITIAL_STATE, action) => {
  //console.log(action);

  switch (action.type) {
    case "LOGIN_USER_SUCCESS":
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case "LOGIN_USER_FAIL":
      return { ...state, ...INITIAL_STATE, loginError: action.payload };
    case "LOGOUT_USER":
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
