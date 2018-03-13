// Article on how to use React Navigation with Redux
// https://hackernoon.com/a-comprehensive-guide-for-integrating-react-navigation-with-redux-including-authentication-flow-cb7b90611adf
// https://github.com/shubhnik/redux-react-navigation-demos

import { NavigationActions } from 'react-navigation';

import AppNavigator from '../navigators';

/* React navigation action objects look like this.
This type of action object gets handled internally by React Navigation.
AppNavigator.router.getActionForPathAndParams('Home') gets us the action object
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

// This code will set-up the initial stack and navigation state for us
// Auth example, start with two routes: The Main screen, with the Login screen on top.
// const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
// const tempNavState = AppNavigator.router.getStateForAction(firstAction);
// const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
//const INITIAL_STATE = AppNavigator.router.getStateForAction(secondAction, tempNavState);

const firstAction = AppNavigator.router.getActionForPathAndParams('Login');
const INITIAL_STATE = AppNavigator.router.getStateForAction(firstAction);

// This is an example of a regular Redux action dispatching a react navigation action from a reducer
// This reducer's state gets updated automatically from React Navigation via a listener.

export default (state = INITIAL_STATE, action) => {
  let nextState;
  switch (action.type) {
    case 'Login':
      //nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Home' }), state);
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }), state);
      break;
    default:
      // below catches any React navigation action objects that are dispatched from components
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || { ...state };
};
