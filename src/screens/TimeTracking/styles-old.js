const primary = require("../../theme/variables/commonColor").brandPrimary;

const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;

export default {
  timeTrackingHeaderText: {
    fontSize: 20,
    paddingTop: 8,
    fontWeight: "bold",
    marginTop: Platform.OS === "android" ? -10 : 0
  },
  timeEntryContent: {
    flexDirection: "column",
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  timeEntrySwiperContentBox: {
    paddingTop: 20,
    paddingBottom: 20
  },
  timeEntryType: {
    color: Platform.OS === "android" ? "#777" : "#666",
    fontSize: 18,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  timeEntryDate: {
    color: Platform.OS === "android" ? "#777" : "#666",
    fontSize: 14,
    alignSelf: "flex-start",
    fontWeight: "bold",
    paddingTop: 5
  },
  timeEntryHours: {
    color: Platform.OS === "android" ? "#777" : "#666",
    fontSize: 14,
    alignSelf: "flex-start",
    fontWeight: "bold",
    paddingTop: 5,
    paddingLEft: -4
  },
  timeIcon: {
    fontSize: 20,
    marginLeft: Platform.OS === "android" ? 15 : 0,
    paddingLeft: Platform.OS === "android" ? 0 : 20,
    paddingRight: 5,
    marginTop: Platform.OS === "android" ? 6 : 4,
    color: "#666"
  },
  arrowIcon: {
    fontSize: 30,
    marginLeft: Platform.OS === "android" ? 15 : 0,
    paddingLeft: Platform.OS === "android" ? 0 : 20,
    paddingRight: 5,
    marginTop: Platform.OS === "android" ? 1 : -1,
    color: "#666",
    fontWeight: "bold"
  },
  newsTypeText: {
    color: Platform.OS === "android" ? "#777" : "#666",
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 2
  },
  newsPoster: {
    height: 330,
    width: null,
    resizeMode: "cover",
    flex: 1,
    position: "relative"
  },
  newsPosterHeader: {
    fontWeight: "900"
  },
  newsPosterLink: {
    opacity: 0.8,
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  newsPosterTypeView: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignSelf: "flex-end"
  },
  newsPosterTypeText: {
    opacity: 0.8,
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 2
  },
  timePosterIcon: {
    fontSize: 20,
    marginLeft: Platform.OS === "android" ? 20 : 0,
    paddingLeft: Platform.OS === "android" ? 0 : 20,
    paddingRight: 5,
    marginTop: Platform.OS === "android" ? -1 : -2,
    color: "#fff"
  },
  slide: {
    flex: 1,
    width: deviceWidth,
    height: 330,
    backgroundColor: "transparent"
  },
  swiperTextContent: {
    position: "absolute",
    bottom: -5,
    padding: 20
  },
  swiperDot: {
    backgroundColor: "rgba(0,0,0,.8)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 0
  },
  swiperActiveDot: {
    backgroundColor: "#fff",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 0
  },
  container: {
    flex: 1,
    width: null,
    height: null
  },
  logoHeader: {
    width: 20,
    height: 28,
    alignSelf: "center"
  },
  text: {
    fontSize: 15,
    color: "#000",
    marginBottom: 10
  },
  header: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: Platform.OS === "ios" ? undefined : -30
  },
  rowHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingTop: Platform.OS === "android" ? 0 : 0
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: "contain"
  }
};
