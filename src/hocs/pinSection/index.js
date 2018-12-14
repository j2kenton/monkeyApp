import React, { Component } from 'react';

export default function carousel(WrappedComponent) {
  return class extends Component {
    static contextTypes = {
    };

    static displayName = `Carousel(${WrappedComponent.name})`;

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      const isPinValid = (typeof nextProps.pin === "string");
      const isPinChanged = (this.props.pin !== nextProps.pin);
      return isPinValid && isPinChanged;
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };
}
