// @flow
import { AsyncStorage } from "react-native";
// Below for development only
// import { composeWithDevTools } from 'redux-devtools-extension';
// Below should cause app to log only when in production
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createStore, applyMiddleware } from "redux";

// Redux-thunk middleware
import thunk from "redux-thunk";
// React-Navigation middleware
import { navMiddleware } from '../utils/navigation/tools';

import { persistStore } from "redux-persist";
import reducer from "../reducers";

// This is where we can configure redux-devtools-extension for react-native-debugger
// See options at: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
const composeEnhancers = composeWithDevTools({
  name: "SARBox",
  realtime: true,
  hostname: 'localhost',
  port: 8000
});

export default function configureStore(onCompletion: () => void): any {

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, navMiddleware)));
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
};
