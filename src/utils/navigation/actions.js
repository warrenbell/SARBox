
// Example of navigation action with autorization
const navToHome = () => {
  return (dispatch, getState) => {
       const { authzReducer } = getState();
       const { authorizations } = authzReducer;
       if(authorizations['showHomeScreen'] && authorizations['showHomeScreen'].allowed) {
         dispatch({ type: "NAV_HOME" });
       } else {
         dispatch({ type: "NAV_MESSAGE", params: { authzErrorMessage: ( authorizations['showHomeScreen'] ? authorizations['showHomeScreen'].authzErrorMessage : "You are not authorized to view this screen" }});
       }
  };
};
