const INITIAL_STATE = {
  loginError: '',
  isLogedIn: false
};

export default (state = INITIAL_STATE, action) => {
  //console.log(action);

  switch (action.type) {
    case "LOGIN_USER_SUCCESS":
      return { ...INITIAL_STATE, isLogedIn: true };
    case "LOGIN_USER_FAIL":
      return { ...INITIAL_STATE, loginError: action.loginError };
    case "LOGOUT_USER":
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
