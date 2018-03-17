// @flow
import React, { Component } from "react";
import {
  Platform,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  View as RNView
} from "react-native";
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

import ProgressBar from "../../components/ProgressBar/ProgressBar";

import styles from "./styles";

class TimeTracking extends Component {

  renderHour = ( { item } ) => {
    const hoursText = item.hours + (item.hours > 1 ? ' hours' : ' hour');
    return (
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => this.props.navigation.navigate("Story")}
      >
        <View style={styles.timeEntryContent}>
          <Grid style={styles.timeEntrySwiperContentBox}>
            <Col style={{ flexDirection: "row" }}>
              <Text style={styles.timeEntryType}>
                {item.type}
              </Text>
            </Col>
            <Col style={{ flexDirection: "row" }}>
              <Text style={styles.timeEntryDate}>
                {item.date}
              </Text>
            </Col>
            <Col style={{ flexDirection: "row" }}>
              <Icon name="ios-time-outline" style={styles.timeIcon} />
              <Text style={styles.timeEntryHours}>
                {hoursText}
              </Text>
              <Icon name="ios-arrow-forward-outline" style={styles.arrowIcon} />
            </Col>
          </Grid>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { navigation, user } = this.props;
    //const primary = require("../../theme/variables/commonColor").brandPrimary;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => navigation.dispatch({ type:'NAV_DRAWER_OPEN' })}
            >
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>
            <Text style={styles.timeTrackingHeaderText}>Hours</Text>
          </Body>
          <Right />
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <FlatList
            data={user.time_entries}
            renderItem={this.renderHour}
            keyExtractor={item => item.id}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  const { user } = authReducer;
  return { user };
};

export default connect(mapStateToProps, null)(TimeTracking);
