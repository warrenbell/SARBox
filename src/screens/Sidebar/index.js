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
    const { logoutUser, navigation } = this.props;
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
                navigation.dispatch({ type:'NAV_HOME' })
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
                navigation.dispatch({ type:'NAV_MAPPING' })
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-map-outline" />
              <Text style={styles.linkText}>MAPPING</Text>
            </ListItem>



            <ListItem
              button
              onPress={() => {
                navigation.dispatch({ type:'NAV_CALL_OUTS' })
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-megaphone-outline" />
              <Text style={styles.linkText}>CALL OUTS</Text>
            </ListItem>



            <ListItem
              button
              onPress={() => {
                navigation.dispatch({ type:'NAV_MISSIONS' })
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
                navigation.dispatch({ type:'NAV_TRAININGS' })
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
                navigation.dispatch({ type:'NAV_TIME_TRACKING' })
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
                navigation.dispatch({ type:'NAV_SOCIAL' })
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-bonfire-outline" />
              <Text style={styles.linkText}>SOCIAL</Text>
            </ListItem>



            <ListItem
              button
              onPress={() => {
                navigation.dispatch({ type:'NAV_SETTINGS' })
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
                      logoutUser();
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

                    </Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => {
                      navigation.dispatch({ type:'NAV_SETTINGS' })
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

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, { logoutUser })(SideBar);
