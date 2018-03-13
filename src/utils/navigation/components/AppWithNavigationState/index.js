// AppWithNavigationState gets used in /src/App and is responsible for navigtion

import React, { Component } from "react";
import { BackHandler } from "react-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from "react-navigation";

import AppNavigator from "../../navigators";

import { navAddListener } from '../../utils';


class AppWithNavigationState extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navReducer: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // Deal with Android hardware back button
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    // Deal with Android hardware back button
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  // Deal with Android hardware back button
  onBackPress = () => {
    const { dispatch, navReducer } = this.props;
    if (navReducer.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  // This is where React Navigation gets wired up to Redux via addNavigationHelpers(dispatch, state, navAddListener)
  // This allows us to call this.props.navigation.dispatch(...)
  render() {
    const { dispatch, navReducer } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: navReducer,
          navAddListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  navReducer: state.navReducer,
});

export default connect(mapStateToProps)(AppWithNavigationState);
