// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, ListView } from "react-native";

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

import CustomHeader from "../../components/CustomHeader";

import styles from "./styles";
import datas from "./data";

type Props = {
  navigation: () => void
};
class TimeTracking extends Component {
  state: {
    listViewData: any
  };
  props: Props;
  dataSource: Object;
  constructor(props: Props) {
    super(props);
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listViewData: datas
    };
  }

  deleteRow(secId: string, rowId: string, rowMap: any) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
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
        onPress={() => navigation.dispatch({ type:"NAV_TIME_ENTRY" })}
      >
        <View style={styles.newsContent}>
          <Text numberOfLines={1} style={styles.newsHeader2}>
            {data.timeType}
          </Text>
          <Text numberOfLines={1} style={styles.newsHeader}>
            {data.timeNote}
          </Text>
          <Grid style={{ marginTop: 10 }}>
            <Col style={{ flexDirection: "row" }}>
              <Icon name="ios-calendar-outline" style={styles.timeIcon} />
              <Text style={styles.newsLink}>
                {data.timeDate}
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
                {data.mileage + (data.mileage === 1 ? ' mile' : ' miles')}
              </Text>
            </Col>
          </Grid>
        </View>
      </ListItem>
    );
  }




  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Image
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
              <Text style={styles.profileUser}>John Smith</Text>
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

            {this.dataSource.cloneWithRows(this.state.listViewData).getRowCount() === 0
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
                    dataSource={this.dataSource.cloneWithRows(this.state.listViewData)}
                    renderRow={data => this.renderRow(data)}
                    renderLeftHiddenRow={() => null}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                      <Button
                        full
                        danger
                        onPress={_ => this.deleteRow(secId, rowId, rowMap)}
                        style={styles.swipeBtn}
                      >
                        <Icon active name="trash" style={{ fontSize: 35 }} />
                      </Button>}
                    rightOpenValue={-100}
                  />
                </View>}
          </Content>
        </Image>
      </Container>
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  const { user } = authReducer;
  return { user };
};

export default connect(mapStateToProps, null)(TimeTracking);
