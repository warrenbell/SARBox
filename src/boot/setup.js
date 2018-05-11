import React, { Component } from "react";
// This gets the layout to work with iPhone X
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { StyleProvider } from "native-base";

import App from "../App";
import configureStore from "./configureStore";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

import DataSourceManager from '../utils/persistence/DataSourceManager';

export default class Setup extends Component {
  state: {
    store: Object,
    isLoading: boolean
  };
  constructor() {
    super();
    this.state = {
      isLoading: false,
      store: configureStore(() => this.setState({ isLoading: false }))
    };
    // Create timeEntries db and design doc needed for replication
    const timeEntriesLocalDB = DataSourceManager.getInstance().getTimeEntriesLocalDB();
    timeEntriesLocalDB.put({
      "_id": "_design/replication",
      "filters": {
        "byUsername": "function (doc, req) {\n  return doc.username === req.query.username;\n}"
      }
    }).then(response => {
      //console.log("timeEntriesLocalDB.put(designDoc) response:\n" + JSON.stringify(response, null, 2));
    }).catch(error => {
      //console.log("timeEntriesLocalDB.put(designDoc) error:\n" + JSON.stringify(error, null, 2));
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
        <StyleProvider style={getTheme(variables)}>
          <Provider store={this.state.store}>
            <App />
          </Provider>
        </StyleProvider>
      </SafeAreaView>
    );
  }
}
