const INITIAL_STATE = {
  permissions: [],
  authorizations: {},
  isAuthzInitialized: false
};

// This function removes any duplicate permissions
const removeDuplicatePermissions = (arrArg) => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos);

// This gets real confusing using the spread operator (...) on an array property
// Example
// var arr1 = ['two', 'three'];
// var arr2 = ['one', ...arr1, 'four', 'five'];
// arr2 will result in ["one", "two", "three", "four", "five"]

export default (state = INITIAL_STATE, action) => {
  //console.log(action);
  switch (action.type) {
    case "ADD_PERMISSIONS":
      // action.permissions is the permissions array comming from the action i.e. ['permission1', 'permission2']
      return { ...state, permissions: removeDuplicatePermissions([ ...state.permissions, ...action.permissions ]) };
    case "RESET_PERMISSIONS":
      // action.permissions is the permissions array comming from the action i.e. ['permission1', 'permission2']
      return { ...state, permissions: removeDuplicatePermissions([ ...action.permissions ]) };
    case "REMOVE_PERMISSION":
      // action.permission is the permission string comming from the action i.e. 'permission3'
      var newPermissions = state.permissions.filter(permission => permission !== action.permission);
      return { ...state, permissions: removeDuplicatePermissions(newPermissions) };
    case "CLEAR_PERMISSIONS":
      return { ...state, permissions: [] };
    case "CLEAR_AUTHORIZATIONS":
      return { ...state, authorizations: {}, isAuthzInitialized: false };
    case "ADD_AUTHORIZATIONS":
      return { ...state, authorizations: { ...state.authorizations, ...action.authorizations }, isAuthzInitialized: true };
    case "RESET_AUTHORIZATIONS":
      return { ...state, authorizations: { ...action.authorizations }, isAuthzInitialized: true };
    default:
      return state;
  }
};
