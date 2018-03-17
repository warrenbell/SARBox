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
import { Field, reduxForm, change, initialize as initializeForm, SubmissionError } from "redux-form";

import styles from "./styles";
// import commonColor from "../../theme/variables/commonColor";

// Get login actions
import { loginUser } from "../../actions";

// Get form Validators
import validators from "../../utils/validators"

// Get images
const bg = require("../../../assets/bg.png");
const logo = require("../../../assets/logo.png");

// Form Validators
const usernameRequired = validators.required("A username is required");
const passwordRequired = validators.required("A password is required");
const passwordMaxLength = validators.maxLength(15, "No more than 15 characters");
const passwordMinLength = validators.minLength(8, "No less than 8 characters");
const alphaNumeric = validators.alphaNumericNoSpaces("Must be letters and numbers only")

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
  const oldUsernameValue = props.values.username;
  dispatch(initializeForm("loginForm"));
  dispatch(change("login", "username", oldUsernameValue));
}

declare type Any = any;
class LoginForm extends Component {
  textInput: Any;

  componentDidMount() {
    const { user, navigation } = this.props;
    if(user) {
      navigation.dispatch({ type:'LOGIN' });
    }
  }

  // redux-form handleSubmit calls onSubmit
  onSubmit(values, dispatch, props) {
    return new Promise((resolve, reject) => {
      const {pristine } = props;
      const { username, password } = values;
      if(pristine) {
        throw { "loginError": "Enter your username and password." };
      } else {
        // Don't need to bind loginUser to props when using dispatch
        dispatch(loginUser(username, password, resolve, reject));
      }
    }).then((success) => {
      // console.warn("success:\n" + JSON.stringify(success, null, 2));
    }).catch((fail) => {
      // console.warn("fail:\n" + JSON.stringify(fail, null, 2));
      throw new SubmissionError({ _error: fail.loginError });
    });
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon
            active
            name={input.name === "username" ? "mail" : "unlock"}
            style={{ color: "#fff" }}
          />
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder={input.name === "username" ? "Username" : "Password"}
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
    const { handleSubmit, submitting, navigation } = this.props;
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
                  name="username"
                  component={this.renderInput}
                  type="text"
                  validate={[alphaNumeric, usernameRequired]}
                />
                <Field
                  name="password"
                  component={this.renderInput}
                  type="password"
                  validate={[alphaNumeric, passwordMinLength, passwordMaxLength, passwordRequired]}
                />
                {this.renderLoginButton()}
                <View style={styles.otherLinksContainer}>
                  <Left>
                    <Button
                      small
                      transparent
                      style={{ alignSelf: "flex-start" }}
                      onPress={() => navigation.dispatch({ type:'NAV_SIGN_UP' })}
                    >
                      <Text style={styles.helpBtns}>Create Account</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Button
                      small
                      transparent
                      style={{ alignSelf: "flex-end" }}
                      onPress={() => navigation.dispatch({ type:'NAV_FORGOT_PASSWORD' })}
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
                    onPress={() => navigation.dispatch({ type:'NAV_WALKTHROUGH' })}
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

// Set-up redux-form
const Login = reduxForm({
  form: "loginForm",
  onSubmitFail: onSubmitFail,
  persistentSubmitErrors: true
})(LoginForm);

// loginError, user gets bound to props
const mapStateToProps = ({ authReducer }) => {
  const { loginError, user } = authReducer;
  return { loginError, user };
};

// Auto binding of actions to props. Do not need to use bindAction with code below
// Action initializeForm function gets bound to props
// connect(mapStateToProps, { initializeForm })

export default connect(mapStateToProps, { initializeForm })(Login);
