// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";

import {
  Container,
  Content,
  Text,
  Icon,
  ListItem,
  Thumbnail,
  View
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import { connect } from "react-redux";

// Get login actions
import { logoutUser } from "../../actions";

import styles from "./style";

class SideBar extends Component {
  render() {
    const navigation = this.props.navigation;
    const { logout } = this.props;
    return (
      <Container>
        <Image
          source={require("../../../assets/sidebar-transparent.png")}
          style={styles.background}
        >
          <Content style={styles.drawerContent}>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Home");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-grid-outline" />
              <Text style={styles.linkText}>NEWS</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Channels");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-keypad-outline" />
              <Text style={styles.linkText}>CHANNELS</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Overview");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-stats" />
              <Text style={styles.linkText}> OVERVIEW</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Calendar");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-calendar-outline" />
              <Text style={styles.linkText}>CALENDAR</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Timeline");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-timer-outline" />
              <Text style={styles.linkText}>TIMELINE</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Profile");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-person-outline" />
              <Text style={styles.linkText}> PROFILE</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Settings");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-settings-outline" />
              <Text style={styles.linkText}>SETTINGS</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Feedback");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-paper-outline" />
              <Text style={styles.linkText}>FEEDBACK</Text>
            </ListItem>
          </Content>
          <View style={styles.logoutContainer}>
            <View style={styles.logoutbtn} foregroundColor={"white"}>
              <Grid>
                <Col>
                  <TouchableOpacity
                    onPress={() => {
                      logout(navigation);
                    }}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "transparent"
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      LOG OUT
                    </Text>
                    <Text note style={{ color: "#fff" }}>
                      Kumar Sanket
                    </Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => {
                      navigation.navigate("Profile");
                    }}
                  >
                    <Thumbnail
                      source={require("../../../assets/Contacts/sanket.png")}
                      style={styles.profilePic}
                    />
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
          </View>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    logout: (navigation) => dispatch(logoutUser(navigation))
  };
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, bindAction)(SideBar);
