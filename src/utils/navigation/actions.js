
// Example of navigation action with autorization
export const navToTimeTracking = () => {
  return (dispatch, getState) => {
       const { authzReducer, userReducer } = getState();
       const { authorizations } = authzReducer;
       const { user } = userReducer;
       if(user && authorizations['showTimeTrackingScreen'] && authorizations['showTimeTrackingScreen'].allowed) {
         dispatch({ type: "NAV_TIME_TRACKING" });
       } else {
         if(!user) {
           dispatch({ type: "NAV_ERROR", navError: "You can not go to Time Tracking. There is no user loged in" });
         } else {
           dispatch({ type: "NAV_ERROR", navError: ( authorizations['showTimeTrackingScreen'] ?  authorizations['showTimeTrackingScreen'].authzErrorMessage : "You are not authorized to view this screen") });
         }
         dispatch({ type: "NAV_DRAWER_CLOSE" });
         //navigation.dispatch({ type:'NAV_DRAWER_OPEN' })
       }
  };
};
