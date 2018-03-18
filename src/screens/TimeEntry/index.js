// @flow
import React, { Component } from "react";
import { Image } from "react-native";

import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Item,
  Input,
  Left,
  Right,
  Body,
  View
} from "native-base";
import styles from "./styles";

const headerLogo = require("../../../assets/header-logo.png");
const primary = require("../../theme/variables/commonColor").brandPrimary;
type Props = {
  navigation: () => void
};
class TimeEntry extends Component {
  state: {
    offset: {
      x: 0,
      y: 0
    }
  };
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      offset: {
        x: 0,
        y: 0
      }
    };
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Header hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => navigation.dispatch({ type:'NAV_BACK'})}
            >
              <Icon active name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={styles.feedbackHeader}>Edit Hours</Text>
          </Body>
          <Right />
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          contentOffset={this.state.offset}
          scrollEnabled={true}
        >
          <View style={styles.bg}>
            <View style={styles.feedbackHeaderContainer}>
              <Text style={styles.feedbackHeader}>John Smith</Text>
            </View>
          </View>

          <View style={styles.feedbackContainer}>
            <Item rounded style={styles.inputGrp}>
              <Icon
                name="ios-construct-outline"
                style={{ color: "rgba(0,0,0,0.5)", marginTop: 3 }}
              />
              <Input
                placeholder="Type of Hours"
                placeholderTextColor="rgba(0,0,0,0.3)"
                style={styles.input}
              />
            </Item>

            <Item rounded style={styles.inputGrp}>
              <Icon
                name="ios-calendar-outline"
                style={{ color: "rgba(0,0,0,0.5)", marginTop: 3 }}
              />
              <Input
                placeholder="Date"
                placeholderTextColor="rgba(0,0,0,0.3)"
                style={styles.input}
              />
            </Item>

            <Item rounded style={styles.inputGrp}>
              <Icon
                name="ios-time-outline"
                style={{ color: "rgba(0,0,0,0.5)", marginTop: 3 }}
              />
              <Input
                placeholder="Hours"
                placeholderTextColor="rgba(0,0,0,0.3)"
                style={styles.input}
              />
            </Item>

            <Item rounded style={styles.inputGrp}>
              <Icon
                name="ios-car-outline"
                style={{ color: "rgba(0,0,0,0.5)", marginTop: 3 }}
              />
              <Input
                placeholder="Mileage"
                placeholderTextColor="rgba(0,0,0,0.3)"
                style={styles.input}
              />
            </Item>

            <Item regular style={{ marginTop: 10 }}>
              <Input
                placeholder="Notes..."
                placeholderTextColor="rgba(0,0,0,0.5)"
                style={styles.inputBox}
                multiline
                returnKeyType="default"
              />
            </Item>
            <Button
              style={{ alignSelf: "flex-end", marginTop: 10, height: 40 }}
              onPress={() => navigation.dispatch({ type:'NAV_BACK'})}
            >
              <Text>Save</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default TimeEntry;
