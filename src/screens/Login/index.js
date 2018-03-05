// @flow
import React, { Component } from "react";
import { ImageBackground, Platform, StatusBar } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Icon,
  View,
  Left,
  Right,
  Toast,
  H1,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import { Field, reduxForm, change, initialize, SubmissionError } from "redux-form";

import styles from "./styles";
// import commonColor from "../../theme/variables/commonColor";

// Get login actions
import { loginUser } from "../../actions";

const bg = require("../../../assets/bg.png");
const logo = require("../../../assets/logo.png");

// Form Validators
const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

const onSubmitFail = (errors, dispatch, submitError, props) => {
  console.warn("onSubmitFail CALLED");
  const { _error } = errors;
  if (_error) {
    Toast.show({
        text: _error,
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" }
      });
  }
  const oldEmailValue = props.values.email;
  dispatch(initialize("login"));
  dispatch(change("login", "email", oldEmailValue));
}

declare type Any = any;
class LoginForm extends Component {
  textInput: Any;

  componentDidMount() {
    const { user, navigation } = this.props;
    if(user) {
      navigation.navigate("Overview");
    }
  }

  onSubmit(values, dispatch, props) {
    // Create a promise so redux form uses the property submitting
    return new Promise((resolve, reject) => {
      const {login, pristine, navigation } = props;
      if(pristine) {
        Toast.show({
            text: "Enter your email and password.",
            duration: 2500,
            position: "top",
            textStyle: { textAlign: "center" }
          });
          resolve();
      } else {
        login(values.email, values.password, navigation, resolve, reject);
      }
    }).then()
    .catch(loginError => {
      throw new SubmissionError({ _error: loginError });
    });
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon
            active
            name={input.name === "email" ? "mail" : "unlock"}
            style={{ color: "#fff" }}
          />
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder={input.name === "email" ? "Email" : "Password"}
            secureTextEntry={input.name === "password" ? true : false}
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

  displayLoginErrorMessage(loginError) {
    Toast.show({
      text: loginError,
      duration: 2500,
      position: "top",
      textStyle: { textAlign: "center" }
    });
  }

  renderLoginButton() {
      const { handleSubmit, submitting, invalid, dirty } = this.props;
      return (
        <Button
        rounded
        disabled={submitting || (invalid && dirty) ? true : false}
        primary
        block
        large
        style={styles.loginBtn}
        onPress={handleSubmit(this.onSubmit)}
        >
          <Text
            style={
              Platform.OS === "android"
                ? (submitting ? { fontSize: 16, textAlign: "center", top: -5, marginRight: 10 } : { fontSize: 16, textAlign: "center", top: -5 })
                : (submitting ? { fontSize: 16, textAlign: "center", fontWeight: "900", marginRight: 10 } : { fontSize: 16, textAlign: "center", fontWeight: "900" })
            }
          >
          {submitting
            ? 'Logging In'
            : 'Log In'
          }
          </Text>
          {submitting
            ? <Spinner color='white' style={styles.spinnerStyle} />
            : <Text />
          }
        </Button>
      );
  }

  render() {
    const navigation = this.props.navigation;
    const { handleSubmit, submitting} = this.props;
    //console.warn("PROPS:\n" + JSON.stringify(this.props, null, 2));
    //console.warn("ERROR:\n" + JSON.stringify(error, null, 2));
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={bg} style={styles.background}>
          <Content contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
              <Text style={styles.logoText}>SARBox</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.form}>
                <Field
                  name="email"
                  component={this.renderInput}
                  type="email"
                  validate={[email, required]}
                />
                <Field
                  name="password"
                  component={this.renderInput}
                  type="password"
                  validate={[alphaNumeric, minLength8, maxLength15, required]}
                />
                {this.renderLoginButton()}
                <View style={styles.otherLinksContainer}>
                  <Left>
                    <Button
                      small
                      transparent
                      style={{ alignSelf: "flex-start" }}
                      onPress={() => navigation.navigate("SignUp")}
                    >
                      <Text style={styles.helpBtns}>Create Account</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Button
                      small
                      transparent
                      style={{ alignSelf: "flex-end" }}
                      onPress={() => navigation.navigate("ForgotPassword")}
                    >
                      <Text style={styles.helpBtns}>Forgot Password</Text>
                    </Button>
                  </Right>
                </View>
                <View style={{ flex: 1, alignSelf: "flex-end" }}>
                  <Button
                    light
                    small
                    transparent
                    style={styles.skipBtn}
                    onPress={() => navigation.navigate("Walkthrough")}
                  >
                    <Text
                      style={
                        (
                          [styles.helpBtns],
                          { top: Platform.OS === "ios" ? null : 0 }
                        )
                      }
                    >
                      Skip
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
const Login = reduxForm({
  form: "login",
  onSubmitFail: onSubmitFail,
  persistentSubmitErrors: true
})(LoginForm);

function bindAction(dispatch) {
  return {
    login: (email, password, navigation, resolve, reject) => dispatch(loginUser(email, password, navigation, resolve, reject))
  };
}

const mapStateToProps = ({ loginReducer }) => {
  const { loginError, user } = loginReducer;
  return { loginError, user };
};

export default connect(mapStateToProps, bindAction)(Login);
