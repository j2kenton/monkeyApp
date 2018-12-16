import React, { Component } from 'react';

export default function carousel(WrappedComponent) {
  return class extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      const isErrorValid = (typeof nextProps.errorMsg === "string");
      const isErrorChanged = (this.props.errorMsg !== nextProps.errorMsg);
      return isErrorValid && isErrorChanged;
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };
}
