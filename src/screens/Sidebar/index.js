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
              <Icon name="ios-home-outline" />
              <Text style={styles.linkText}>HOME</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Missions");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-beer-outline" />
              <Text style={styles.linkText}>MISSIONS</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Trainings");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-school-outline" />
              <Text style={styles.linkText}>TRAININGS</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("TimeTracking");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-timer-outline" />
              <Text style={styles.linkText}>TIME TRACKING</Text>
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
                      Warren Bell
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
