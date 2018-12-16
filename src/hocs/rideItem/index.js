import React, { Component } from 'react';

export default function carousel(WrappedComponent) {
  return class extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      const isSelectionValid = Number.isInteger(nextProps.selection);
      const isSelectionChanged = (this.props.selection !== nextProps.selection);
      return isSelectionValid && isSelectionChanged;
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };
}
