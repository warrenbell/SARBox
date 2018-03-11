// @flow
import { AsyncStorage } from "react-native";
import { composeWithDevTools } from 'redux-devtools-extension';
// Below should cause app to log only when in production
//import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import reducer from "../reducers";

const composeEnhancers = composeWithDevTools({
  name: "SARBox",
  realtime: true,
  hostname: 'localhost',
  port: 8000
});

export default function configureStore(onCompletion: () => void): any {

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
