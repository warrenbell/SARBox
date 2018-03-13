import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from 'react-navigation-redux-helpers';

// functions that help React Navigation update our navReducer

const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navReducer,
);
const navAddListener = createReduxBoundAddListener("root");

export {
  navMiddleware,
  navAddListener,
};
