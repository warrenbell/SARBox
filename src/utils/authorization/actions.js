// A lot of code was used from the react-redux-permissions package located at
// https://github.com/shizpi/react-redux-permissions

import { isAuthorized } from "./core";

//import getStore from  "../../boot/configureStore";

// Add one or more permissions to the Redux store
export const addPermissions = (permissions = []) => {
  return {
    type: "ADD_PERMISSIONS",
    permissions: Array.isArray(permissions) ? permissions : [permissions]
  }
}

// Clear all permission and add one or more permissions to the Redux store
export const resetPermissions = (permissions = []) => {
  return {
    type: "RESET_PERMISSIONS",
    permissions: Array.isArray(permissions) ? permissions : [permissions]
  }
}

// Remove a permission from the Redux store
export const removePermission = (permission) => {
  return {
    type: "REMOVE_PERMISSION",
    permission
  }
}

// Clear all permissions from the Redux store
export const clearPermissions = () => {
  return {
    type: "CLEAR_PERMISSIONS"
  };
}

// Clear all permissions from the Redux store
export const clearAuthorizations = () => {
  // console.warn("clearAuthorizations CALLED");
  return {
    type: "CLEAR_AUTHORIZATIONS"
  };
}

// Always use redux-thunk to get state in actions. Do not use import getStore from  "../../boot/configureStore";
// Check if user is authorized based on permissions and set a key true or false.
// The @checks array allows you to make many different checks while only changing state once.
// @checks is an array structured like this: [{allowed: ['permission1', 'permission2'], except: ['permission1', 'permission2'], key: 'keyName'}, {...}, {...}]
// @reset will clear all old authorization keys out and start from scratch
// Example setAuthorizations([{allowed: ['read-home-message'], except: [], key: 'showHomeMessage'}], true);
export const setAuthorizations = (checks, reset) => {
  return (dispatch, getState) => {
       const { authzReducer } = getState();
       const { permissions } = authzReducer;
       var authorizations = {};
       checks.forEach((check) => {
         if(isAuthorized(permissions, check.allowed, check.except)) {
           authorizations[check.key] = true;
         } else {
           authorizations[check.key] = false;
         }
       });
       if(reset) {
         dispatch({ type: "RESET_AUTHORIZATIONS", authorizations });
       } else {
         dispatch({ type: "ADD_AUTHORIZATIONS", authorizations });
       }
  };
};
