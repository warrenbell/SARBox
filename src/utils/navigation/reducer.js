// Article on how to use React Navigation with Redux
// https://hackernoon.com/a-comprehensive-guide-for-integrating-react-navigation-with-redux-including-authentication-flow-cb7b90611adf
// https://github.com/shubhnik/redux-react-navigation-demos
// https://github.com/react-navigation/react-navigation/issues/485

import { NavigationActions } from 'react-navigation';

import AppNavigator from './navigators';

/* React navigation action objects look like this.
This type of action object gets handled internally by React Navigation.
NavigationActions.navigate({ routeName: 'Home' }) gets us the action object and navigates
{
  "type": "Navigation/NAVIGATE",
  "routeName": "someRouteNameHere",
  "params":{
      "name":"someParamHere"
  }
}
*/

/// Dispatching a react navigation action from a component through navigation
// this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Login' })),
// this.props.navigation.dispatch(NavigationActions.navigate({ routeName:'screen2', params:{name:'Shubhnik'}}))
// Dispatching a react navigation action via our reducers which calls then calls React Navigation action
// this.props.navigation.dispatch({ type: 'Login' })}

// Start with two routes: The Home screen, with the Login screen on top.
// Still stuck here. Not sure how to create the inital stack. Start out with Login and go foreward or always remove Login? Only use NavigationActions.back() on login if you want to preserve the stack?
const homeDrawerNavState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: "Home" }));
const homeDrawerLoginNavState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: "Login" }), homeDrawerNavState );

const INITIAL_STATE = { ...homeDrawerLoginNavState, navError: null };

// This will reset the navigation stack back to the INITIAL_STATE
const resetToInitialState = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: "HomeDrawer" }),
    NavigationActions.navigate({ routeName: "Login" })
  ]
});

export default (state = INITIAL_STATE, action) => {
  let nextState;
  switch (action.type) {
    case 'NAV_ERROR':
      nextState = { ...state, navError: action.navError };
      break;
    case 'NAV_DRAWER_OPEN':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName:'DrawerOpen' }), state);
      break;
    case 'NAV_DRAWER_CLOSE':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DrawerClose' }), state);
      break;
    case 'NAV_BACK':
      // Always remove Login screen on successful login
      nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
      break;
    case 'NAV_LOGIN':
      // Always remove Login screen on successful login
      nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
      break;
    case 'NAV_LOGOUT_SLEEP':
      // Add a Login screen to the stack to preserve it
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }), state);
      break;
    case 'NAV_LOGOUT_RESET':
      // Reset the stack to have 2 screens, Home and Login
      nextState = AppNavigator.router.getStateForAction(resetToInitialState, state);
      break;
    case 'NAV_SIGN_UP':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName:'SignUp', params: action.params }), state);
      break;
    case 'NAV_FORGOT_PASSWORD':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName:'ForgotPassword', params: action.params }), state);
      break;
    case 'NAV_WALKTHROUGH':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName:'Walkthrough', params: action.params }), state);
      break;
    case 'NAV_HOME':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName:'Home', params: action.params }), state);
      break;
    case 'NAV_MISSIONS':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName:'Missions', params: action.params }), state);
      break;
    case 'NAV_TRAININGS':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName:'Trainings', params: action.params }), state);
      break;
    case 'NAV_TIME_TRACKING':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName:'TimeTracking', params: action.params }), state);
      break;
      case 'NAV_TIME_ENTRY':
        nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName:'TimeEntry', params: action.params }), state);
        break;
    case 'NAV_MAPPING':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName:'Mapping', params: action.params }), state);
      break;
    case 'NAV_CALL_OUTS':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName:'CallOuts', params: action.params }), state);
      break;
    case 'NAV_SOCIAL':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName:'Social', params: action.params }), state);
      break;
    case 'NAV_SETTINGS':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName:'Settings', params: action.params }), state);
      break;
    default:
      // below catches any React navigation action objects that are dispatched elseware via navigation.dispatch(NavigationActions.navigate({ routeName:'...' }))
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || { ...state };
};
