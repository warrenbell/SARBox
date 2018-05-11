const React = require("react-native");
const { Dimensions, Platform } = React;

const primary = require("../../theme/variables/commonColor").brandPrimary;

import variable from "../../theme/variables/platform";

const styles = {
  formErrorIcon: {
    color: "#fff",
    marginTop: 5,
    right: 10
  },
  formErrorText1: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: primary.brandDanger,
    textAlign: "right",
    top: -10
  },
  formErrorText2: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: "transparent",
    textAlign: "right",
    top: -10
  },
  header: {
    width: Dimensions.get("window").width,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: Platform.OS === "ios" ? undefined : -30
  },
  rowHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingTop: Platform.OS === "android" ? 7 : 0
  },
  btnHeader: {
    alignSelf: "center"
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: "contain",
    alignSelf: "center"
  },
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: primary
  },
  contentIconsContainer: {
    paddingTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  roundedButton: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 30,
    width: 60,
    height: 60
  },
  roundedCustomButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 60,
    height: 60
  },
  feedbackHeaderContainer: {
    padding: 5,
    paddingTop: 5,
    paddingBottom: 10,
    alignSelf: "center",
    backgroundColor: "transparent"
  },
  feedbackHeader: {
    fontSize: 20,
    paddingBottom: 5,
    fontWeight: "600",
    alignSelf: "center"
  },
  feedbackHead: {
    opacity: 0.8,
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFF"
  },
  feedbackContainer: {
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    backgroundColor: "#FFF"
  },
  inputGrp: {
    marginBottom: 20
  },
  input: {
    color: "#000"
  },
  inputHourTypeView: {
    flex: 1,
    flexDirection: 'row',
    height: variable.inputHeightBase,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  inputHourType: {
    color: variable.inputColor,
    fontSize: variable.inputFontSize,
    lineHeight: variable.inputLineHeight,
    paddingLeft: 5,
    paddingRight: 5
  },
  inputHourTypePlaceHolder: {
    color: "rgba(0,0,0,0.5)",
    fontSize: variable.inputFontSize,
    lineHeight: variable.inputLineHeight,
    paddingLeft: 5,
    paddingRight: 5,
  },
  inputBox: {
    maxHeight: 75,
    minHeight: 75,
    textAlignVertical: "top"
  },
  inputBoxIcon: {
    alignSelf: "flex-end"
  },
  forwardIcon: {
    alignSelf: "flex-end",
    paddingBottom: 5
  },
  bg: {
    backgroundColor: primary
  }
};

const getDatePickerCustomStyles = (variables = variable) => {
  const datePickerStyles = {
    dateTouch: {
      width: 142
    },
    dateTouchBody: {
      flexDirection: 'row',
      height: variables.inputHeightBase,
      alignItems: 'center',
      justifyContent: 'center'
    },
    dateIcon: {
      width: 32,
      height: 32,
      marginLeft: 5,
      marginRight: 5
    },
    dateInput: {
      flex: 1,
      flexDirection: 'row',
      height: variables.inputHeightBase,
      borderWidth: 0,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingLeft: 10
    },
    dateText: {
      color: variables.inputColor,
      fontSize: variables.inputFontSize
    },
    placeholderText: {
      color: '#c9c9c9',
      fontSize: variables.inputFontSize
    },
    btnTextConfirm: {
      fontSize: 16,
      color: variables.inputColor
    },
    btnTextCancel: {
      fontSize: 16,
      color: variables.inputColor
    },
    btnCancel: {
      left: 0
    },
    btnConfirm: {
      right: 0
    }/*,
    datePickerMask: {
      flex: 1,
      alignItems: 'flex-end',
      flexDirection: 'row',
      backgroundColor: '#00000077'
    },
    datePickerCon: {
      backgroundColor: '#fff',
      height: 0,
      overflow: 'hidden'
    },
    btnText: {
      position: 'absolute',
      top: 0,
      height: 42,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    datePicker: {
      marginTop: 42,
      borderTopColor: '#ccc',
      borderTopWidth: 1
    },
    disabled: {
      backgroundColor: '#eee'
    }*/
  };
  return datePickerStyles;
};

export { styles, getDatePickerCustomStyles };
