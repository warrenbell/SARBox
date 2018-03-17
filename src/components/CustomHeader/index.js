// @flow
import React, { Component } from "react";
import { Image } from "react-native";
import { Icon, Button, Left, Right, Body, Header } from "native-base";

import styles from "./styles";

const headerLogo = require("../../../assets/header-logo.png");

class CustomHeader extends Component {
  render() {
    const { navigation, hasTabs } = this.props;
    return (
      <Header hasTabs={ hasTabs }>
        <Left>
          <Button transparent onPress={() => navigation.dispatch({ type:'NAV_DRAWER_OPEN' })}>
            <Icon active name="menu" />
          </Button>
        </Left>
        <Body>
          <Image source={headerLogo} style={styles.imageHeader} />
        </Body>
        <Right />
      </Header>
    );
  }
}

export default CustomHeader;
