// Initialize all app wide authorizations for the user
// Do this when user logs in and when the user record is updated
// Clear all authorizations when user logs out.

import { setAuthorizations } from "./actions";

const setInitialAuthorizations = () => {
  //console.warn("setInitialAuthorizations CALLED");
  return setAuthorizations([
    {allowed: ['read-home-screen'], except: [], key: 'showHomeScreen', error: 'You are not authorized to view the Home screen.'},
    {allowed: ['read-home-message'], except: [], key: 'showHomeMessage', error: 'You are not authorized to view the Home message.'}
  ], true);
}

export { setInitialAuthorizations };
