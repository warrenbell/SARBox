// @flow
// TODO wire up redux-form
import React, { Component } from "react";
import { ImageBackground, TouchableWithoutFeedback } from "react-native";

import {
  ActionSheet,
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
  Toast,
  View
} from "native-base";
import DatePicker from "react-native-datepicker";
import { connect } from "react-redux";
import { Field, reduxForm, SubmissionError } from "redux-form";

// Get form Validators
import validators from "../../utils/validators";

import moment from 'moment';

import { upsertTimeEntry } from "../../actions";

import { styles, getDatePickerCustomStyles } from "./styles";

const headerLogo = require("../../../assets/header-logo.png");
const primary = require("../../theme/variables/commonColor").brandPrimary;

// redux-form calls onSubmitFail
const onSubmitFail = (errors, dispatch, submitError, props) => {
  // console.warn("onSubmitFail CALLED");
  const { _error } = errors;
  if (_error) {
    Toast.show({
        text: _error,
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" }
      });
  }
  //const oldUsernameValue = props.values.username;
  //dispatch(initializeForm("loginForm"));
  //dispatch(change("login", "username", oldUsernameValue));
}

const requiredType = validators.required("An hours type is required");
const requiredHours = validators.required("An hour entry is required");

const formatDecimal = (value) => {
  if(value) {
    const newValue = '' + value;
    return newValue;
  }
  return '';
};

// Still working on this
const normalizeDecimal = (decimalPlaces) => (value, previousValue) => {
  if(!decimalPlaces || decimalPlaces < 0) {
    decimalPlaces = 0;
  }
  // remove everything but numbers and deciamls
  const newValue = value.replace(/[^0-9.]/g, '');
  if((newValue.match(/[.]/g) || []).length > 1) {
    return previousValue;
  }
  // remove decimals if more than 1
  if (newValue.indexOf(".") !== -1 && ((newValue.length - 1) - newValue.indexOf(".")) > decimalPlaces) {
    return previousValue;
  }
  // get rid of leading zero
  if (newValue === '0') {
    return '';
  }
  return newValue;
};

type Props = {
  navigation: () => void
};
class TimeEntryForm extends Component {
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
      },
    };
  }



  // redux-form handleSubmit calls onSubmit
  onSubmit(values, dispatch, props) {
    //console.warn("onSubmit Called");
    return new Promise((resolve, reject) => {
      //console.warn("values:\n" + JSON.stringify(values, null, 2));
      const { pristine, user } = props;
      //;
      if(pristine) {
        reject({ "timeEntryError": "You did not change anything." });
      } else {
        values.hours = 1 * values.hours;
        values.miles = 1 * values.miles;
        dispatch(upsertTimeEntry(values, user));
        dispatch({ type:'NAV_BACK'});
        resolve();
      }
    }).then((success) => {
      // console.warn("success:\n" + JSON.stringify(success, null, 2));
    }).catch((fail) => {
      // console.warn("fail:\n" + JSON.stringify(fail, null, 2));
      throw new SubmissionError({ _error: fail.timeEntryError });
    });
  }

  renderTypeInput({ input, label, type, meta: { touched, error, warning }, hourTypeOptions }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon
            active
            name="ios-construct-outline"
            style={{ color: "rgba(0,0,0,0.5)", marginTop: 3 }}
          />
          <TouchableWithoutFeedback
            onPress={() =>
              ActionSheet.show(
                {
                  options: hourTypeOptions,
                  cancelButtonIndex: (hourTypeOptions.length - 1),
                  title: "Select an hours type"
                },
                buttonIndex => {
                  if(buttonIndex !== (hourTypeOptions.length - 1)) {
                    input.onChange(hourTypeOptions[buttonIndex]);
                  }
                }
              )}
          >
          <View style={styles.inputHourTypeView}>
            {input.value
              ? <Text style={styles.inputHourType}>{input.value}</Text>
              : <Text style={styles.inputHourTypePlaceHolder}>Hours Type</Text>}
          </View>
          </TouchableWithoutFeedback>
          {touched && error
            ? <Icon
                active
                style={styles.formErrorIcon}
                onPress={() => this.textInput._root.clear()}
                name="close"
              />
            : <Text />}
        </Item>
        {touched && error
          ? <Text style={styles.formErrorText1}>
              {error}
            </Text>
          : <Text style={styles.formErrorText2}>error here</Text>}
      </View>
    );
  }

  renderDateInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon
            active
            name="ios-calendar-outline"
            style={{ color: "rgba(0,0,0,0.5)", marginTop: 3 }}
          />
          <DatePicker
            style={{ width: 200 }}
            date={moment(input.value, "YYYY-MM-DD").format("MMMM D, YYYY")}
            mode="date"
            showIcon={false}
            placeholder="Date"
            format="MMMM D, YYYY"
            minDate={moment().subtract(1, 'years').format("MMMM D, YYYY")}
            maxDate={moment().format("MMMM D, YYYY")}
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            customStyles={getDatePickerCustomStyles()}
            onDateChange={date => input.onChange(moment(date, "MMMM D, YYYY").format("YYYY-MM-DD"))}
          />
          {touched && error
            ? <Icon
                active
                style={styles.formErrorIcon}
                onPress={() => this.textInput._root.clear()}
                name="close"
              />
            : <Text />}
        </Item>
        {touched && error
          ? <Text style={styles.formErrorText1}>
              {error}
            </Text>
          : <Text style={styles.formErrorText2}>error here</Text>}
      </View>
    );
  }

  renderHoursInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon
            active
            name="ios-time-outline"
            style={{ color: "rgba(0,0,0,0.5)", marginTop: 3 }}
          />
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor="rgba(0,0,0,0.5)"
            style={styles.input}
            keyboardType="numeric"
            placeholder="Hours"
            {...input}
          />
          {touched && error
            ? <Icon
                active
                style={styles.formErrorIcon}
                onPress={() => this.textInput._root.clear()}
                name="close"
              />
            : <Text />}
        </Item>
        {touched && error
          ? <Text style={styles.formErrorText1}>
              {error}
            </Text>
          : <Text style={styles.formErrorText2}>error here</Text>}
      </View>
    );
  }

  renderMilesInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon
            active
            name="ios-car-outline"
            style={{ color: "rgba(0,0,0,0.5)", marginTop: 3 }}
          />
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor="rgba(0,0,0,0.5)"
            style={styles.input}
            keyboardType="numeric"
            placeholder="Miles"
            {...input}
          />
          {touched && error
            ? <Icon
                active
                style={styles.formErrorIcon}
                onPress={() => this.textInput._root.clear()}
                name="close"
              />
            : <Text />}
        </Item>
        {touched && error
          ? <Text style={styles.formErrorText1}>
              {error}
            </Text>
          : <Text style={styles.formErrorText2}>error here</Text>}
      </View>
    );
  }

  renderNoteInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item regular style={{ marginTop: 10 }}>
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor="rgba(0,0,0,0.5)"
            style={styles.inputBox}
            placeholder="Notes..."
            multiline
            returnKeyType="default"
            {...input}
          />
        </Item>
      </View>
    );
  }

  renderSaveButton() {
      const { handleSubmit, submitting, invalid, dirty, pristine } = this.props;
      return (
        <Button
          disabled={submitting || (invalid && dirty) || pristine ? true : false}
          style={{ alignSelf: "flex-end", marginTop: 10, height: 40 }}
          onPress={handleSubmit(this.onSubmit)}
        >
          <Text>
            {submitting
              ? 'Saving ...'
              : 'Save'
            }
          </Text>
        </Button>
      );
  }

  render() {
    const { navigation } = this.props;
    const { submitting, invalid, dirty } = this.props;
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Header hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => {
                navigation.dispatch({ type:'NAV_BACK'});
            }}
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
            <Field
              name="type"
              component={this.renderTypeInput}
              type="text"
              hourTypeOptions={this.props.hourTypeOptions}
              validate={[requiredType]}
            />
            <Field
              name="date"
              component={this.renderDateInput}
              type="date"
            />
            <Field
              name="hours"
              component={this.renderHoursInput}
              type="number"
              format={ formatDecimal }
              normalize={ normalizeDecimal(2) }
              validate={[requiredHours]}
            />
            <Field
              name="miles"
              component={this.renderMilesInput}
              type="number"
              format={ formatDecimal }
              normalize={ normalizeDecimal(1) }
            />
            <Field
              name="note"
              component={this.renderNoteInput}
              type="text"
            />
            {this.renderSaveButton()}
          </View>
        </Content>
      </Container>
    );
  }
}

const TimeEntry = reduxForm({
  form: "timeEntryForm",
  onSubmitFail: onSubmitFail
})(TimeEntryForm);

const mapStateToProps = ({ userReducer, teamReducer, navReducer }) => {
  // user set-up
  const { user } = userReducer;

  // timeEntryHourTypes set-up
  const { teams } = teamReducer;
  // This will be done differently when app has more than one team
  const [ team ] = teams.filter((team) => team.code === user.teams[0]);
  const { settings } = team;
  const { timeEntryHourTypes } = settings;
  // This is the default hour type options
  let hourTypeOptions = ['Mission', 'Meeting', 'Training', 'Other', 'Cancel'];
  if (timeEntryHourTypes) {
    hourTypeOptions = [...timeEntryHourTypes, 'Cancel'];
  }

  // initial values set-up
  const { routes, index } = navReducer;
  const route = routes[index];
  const { params } = route;
  let timeEntry = undefined;
  if(params) {
    timeEntry = params.timeEntry;
  }
  let initialValues;
  if(timeEntry) {
    initialValues = { ...timeEntry };
  } else {
    initialValues = { date: moment().format("YYYY-MM-DD") };
  }
  return { user, hourTypeOptions, initialValues };
};

export default connect(mapStateToProps)(TimeEntry);
