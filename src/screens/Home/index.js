// @flow
import React, { Component } from "react";
import { Image, Platform } from "react-native";
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Right,
  Body,
  Button,
  Icon,
  View,
  Grid,
  Col
} from "native-base";
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';

import ProgressBar from "../../components/ProgressBar/ProgressBar";

// Get authorization actions
import { clearAuthorizations, setAuthorizations } from "../../actions";

import styles from "./styles";

const headerLogo = require("../../../assets/header-logo.png");

class Home extends Component {

  componentDidMount() {
    const { setAuthorizations } = this.props;
    setAuthorizations([{allowed: ['read-home-message'], except: [], key: 'showHomeMessage'}], true);
  }

  componentWillUnmount() {
    const { clearAuthorizations } = this.props;
    clearAuthorizations();
  }

  renderMessage() {
    const { authorizations, isAuthzInitialized } = this.props;
    if(!isAuthzInitialized) {
      return null;
    }
    if(authorizations['showHomeMessage']) {
      return (
        <Text style={styles.overviewHeader}>Home</Text>
      );
    } else {
      return (
        <Text style={styles.overviewHeader}>Not Authorized</Text>
      );
    }
  }

  render() {
    const navigation = this.props.navigation;
    const primary = require("../../theme/variables/commonColor").brandPrimary;
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => navigation.dispatch(NavigationActions.navigate({ routeName:'DrawerOpen' }))}
            >
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>
            <Image source={headerLogo} style={styles.imageHeader} />
          </Body>
          <Right />
        </Header>
        <View style={styles.overviewHeaderContainer}>
          {this.renderMessage()}
          <Text note style={styles.overviewHead}>
            Lots of cool Home stuff here.
          </Text>
        </View>

        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={styles.overviewContent}>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ authzReducer }) => {
  const { authorizations, isAuthzInitialized } = authzReducer;
  return { authorizations, isAuthzInitialized };
};

export default connect(mapStateToProps, { clearAuthorizations, setAuthorizations })(Home);
