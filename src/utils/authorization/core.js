// roles was refactored to be permissions

export const isAuthorized = (permissions, allowed, except) => {
  // Root super user permission check '*'
  if (permissions.length > 0 && permissions.some(elem => elem == '*')) {
    return true;
  }
  if (except.length > 0 && except.some(elem => permissions.indexOf(elem) > -1)) {
    return false;
  }
  if (allowed.length > 0) {
    if (allowed.some(elem => permissions.indexOf(elem) > -1)) {
      return true;
    }
    return false;
  }
  return true;
}

export default { isAuthorized, "test": "test" };
