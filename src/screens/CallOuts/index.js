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

import ProgressBar from "../../components/ProgressBar/ProgressBar";

import styles from "./styles";

const headerLogo = require("../../../assets/header-logo.png");

class CallOuts extends Component {
  render() {
    const { navigation } = this.props;
    const primary = require("../../theme/variables/commonColor").brandPrimary;
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => navigation.dispatch({ type:'NAV_DRAWER_OPEN' })}
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
          <Text style={styles.overviewHeader}>Call Outs</Text>
          <Text note style={styles.overviewHead}>
            Lots of cool Call Outs stuff here.
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

export default CallOuts;
