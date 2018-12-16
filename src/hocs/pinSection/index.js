import React, { Component } from 'react';

export default function carousel(WrappedComponent) {
  return class extends Component {
    static contextTypes = {
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      const isPinValid = (typeof nextProps.pin === "string");
      const isPinChanged = (this.props.pin !== nextProps.pin);
      const isValidChanged = (this.props.isInputValid !== nextProps.isInputValid);
      return isPinValid && (isPinChanged || isValidChanged);
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };
}
