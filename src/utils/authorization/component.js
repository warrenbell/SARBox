// roles was refactored to be permissions
// NOT USING NativeBase Content tag would not render with this component wrapped around it

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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

import { checkVisibility } from "./core";

class Authorization extends Component {
  static propTypes = {
    allowed: PropTypes.array,
    except: PropTypes.array,
    permissions: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
    fallbackElement: PropTypes.node
  };

  static defaultProps = {
    allowed: [],
    except: [],
    fallbackElement: null
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }
  }
  componentWillMount() {
    this.setVisibility();
  }

  componentDidUpdate() {
    this.setVisibility();
  }

  setVisibility() {
    const { permissions, allowed, except } = this.props;
    const { visible } = this.state;
    const newVisibility = checkVisibility(permissions, allowed, except);
    if (visible !== newVisibility) {
      this.setState({
        visible: newVisibility
      });
    }
  }

  render() {
    const { children, fallbackElement } = this.props;
    const { visible } = this.state;
    if (visible) {
      return (
        <View {...otherProps}>
          { children }
        </View>
      );
    }
    return fallbackElement;
  }
}

const mapStateToProps = ({ permissionReducer }) => {
  const { permissions } = permissionReducer;
  return { permissions };
};

export default connect(mapStateToProps, null)(Authorization);
