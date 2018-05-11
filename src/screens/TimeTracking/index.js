// @flow
import React, { Component } from "react";
import { ImageBackground, TouchableOpacity, ListView } from "react-native";

import {
  Container,
  Content,
  Text,
  Header,
  Left,
  Right,
  Body,
  Thumbnail,
  View,
  List,
  ListItem,
  Button,
  Icon
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import { connect } from "react-redux";

import moment from 'moment';

import { deleteTimeEntry } from "../../actions";

import CustomHeader from "../../components/CustomHeader";

import styles from "./styles";

type Props = {
  navigation: () => void
};
class TimeTracking extends Component {
  props: Props;
  dataSource: Object;
  constructor(props: Props) {
    super(props);
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  deleteRow(data: any, secId: string, rowId: string, rowMap: any) {
    const { deleteTimeEntry } = this.props;
    rowMap[`${secId}${rowId}`].props.closeRow();
    deleteTimeEntry(data);
    //const newData = [...this.state.listViewData];
    //newData.splice(rowId, 1);
    //this.setState({ listViewData: newData });
  }

  renderRow(data) {
    const { navigation } = this.props;
    return (
      <ListItem
        swipeList
        style={{
          flexDirection: "row",
          backgroundColor: "#FFF"
        }}
        onPress={() => {
          //setTimeEntry(data);
          navigation.dispatch({ type:"NAV_TIME_ENTRY", params: { timeEntry: data } });
        }}
      >
        <View style={styles.newsContent}>
          <Text numberOfLines={1} style={styles.newsHeader2}>
            {data.type}
          </Text>
          <Text numberOfLines={1} style={styles.newsHeader}>
            {data.note}
          </Text>
          <Grid style={{ marginTop: 10 }}>
            <Col style={{ flexDirection: "row" }}>
              <Icon name="ios-calendar-outline" style={styles.timeIcon} />
              <Text style={styles.newsLink}>
                {moment(data.date, "YYYY-MM-DD").format("MMM D, YYYY")}
              </Text>
            </Col>
            <Col style={{ flexDirection: "row" }}>
              <Icon name="ios-time-outline" style={styles.timeIcon} />
              <Text style={styles.newsTypeText}>
                {data.hours + (data.hours === 1 ? ' hour' : ' hours')}
              </Text>
            </Col>
            <Col style={{ flexDirection: "row" }}>
              <Icon name="ios-car-outline" style={styles.timeIcon} />
              <Text style={styles.newsTypeText}>
                {data.miles + (data.miles === 1 ? ' mile' : ' miles')}
              </Text>
            </Col>
          </Grid>
        </View>
      </ListItem>
    );
  }




  render() {
    console.warn("render in TimeTracking called");
    const { navigation, user } = this.props;
    return (
      <Container>
        <ImageBackground
          source={require("../../../assets/bg-transparent.png")}
          style={styles.container}
        >
          <Header hasTabs>
            <Left>
              <Button
                transparent
                onPress={() => navigation.dispatch({ type:'NAV_DRAWER_OPEN'})}
              >
                <Icon active name="menu" />
              </Button>
            </Left>
            <Body>
              <Text style={styles.feedbackHeader}>Hours</Text>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => navigation.dispatch({ type:'NAV_TIME_ENTRY'})}
              >
                <Icon active name="ios-add" style={{fontSize: 40, fontWeight: "bold"}} />
              </Button>
            </Right>
          </Header>
          <View style={styles.profileInfoContainer}>
            <View style={styles.profileInfo}>
              <Text style={styles.profileUser}>{user.firstName + ' ' + user.lastName}</Text>
              <Text note style={styles.profileUserInfo}>
                BSAR, BMI, Helitec
              </Text>
            </View>
          </View>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#fff" }}
          >
            <View style={styles.linkTabs}>
              <Grid style={{
                backgroundColor: "#fff",
                marginBottom: -15
              }}>
                <Col>
                  <View style={styles.linkTabs_header}>
                    <Text style={styles.linkTabs_tabCounts}>13</Text>
                    <Text note style={styles.linkTabs_tabName}>
                      Hours
                    </Text>
                  </View>
                </Col>
                <Col>
                  <View style={styles.linkTabs_header}>
                    <Text style={styles.linkTabs_tabCounts}>12</Text>
                    <Text note style={styles.linkTabs_tabName}>
                      Miles
                    </Text>
                  </View>
                </Col>
              </Grid>
            </View>

            {this.dataSource.cloneWithRows(this.props.timeEntries).getRowCount() === 0
              ? <View style={styles.linkTabs}>
                  <ListItem
                    style={{
                      backgroundColor: "#fff",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={styles.textNote}>No Time Entries</Text>
                  </ListItem>
                </View>
              : <View>
                  <View style={styles.linkTabs}>
                    <ListItem
                      style={{
                        backgroundColor: "#fff",
                        justifyContent: "center"
                      }}
                    >
                      <Text style={styles.textNote}>
                        Swipe the items to the left to delete
                      </Text>
                    </ListItem>
                  </View>
                  <List
                    dataSource={this.dataSource.cloneWithRows(this.props.timeEntries)}
                    renderRow={data => this.renderRow(data)}
                    renderLeftHiddenRow={() => null}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                      <Button
                        full
                        danger
                        onPress={_ => this.deleteRow(data, secId, rowId, rowMap)}
                        style={styles.swipeBtn}
                      >
                        <Icon active name="trash" style={{ fontSize: 35 }} />
                      </Button>}
                    rightOpenValue={-100}
                  />
                </View>}
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}


const mapStateToProps = ({ userReducer, timeEntryReducer }) => {
  const { user } = userReducer;
  let { timeEntries } = timeEntryReducer;
  if(!timeEntries) {
    timeEntries = [];
  }
  return { user, timeEntries };
};

export default connect(mapStateToProps, { deleteTimeEntry })(TimeTracking);
