// roles was refactored to be permissions
// NOT USING
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { checkVisibility } from "./core";

const Authorization = (allowed = [], except = []) =>
  (WrappedComponent, FallbackElement) => {
    class WithAuthorization extends Component {
      static propTypes = {
        permissions: PropTypes.array.isRequired
      };

      constructor(props) {
        super(props);

        this.state = {
          visible: false
        };
      }
      componentWillMount() {
        this.setVisibility();
      }

      componentDidUpdate() {
        this.setVisibility();
      }

      setVisibility() {
        const { permissions } = this.props;
        const { visible } = this.state;
        const newVisibility = checkVisibility(permissions, allowed, except);
        if (visible !== newVisibility) {
          this.setState({
            visible: newVisibility
          });
        }
      }

      render() {
        const { visible } = this.state;
        if (visible) {
          return <WrappedComponent {...this.props} />;
        }
        return typeof FallbackElement === "function" ? <FallbackElement /> : FallbackElement;
      }
    }

    const mapStateToProps = ({ permissionReducer }) => {
      const { permissions } = permissionReducer;
      return { permissions };
    };

    return connect(mapStateToProps, null)(WithAuthorization);

  }

export default Authorization;
