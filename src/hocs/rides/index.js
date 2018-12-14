import React, { Component } from 'react';

export default function rides(WrappedComponent) {
  return class extends Component {

    static displayName = `Rides(${WrappedComponent.name})`;

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      const isSelectionValid = Number.isInteger(nextProps.selection) && (nextProps.selection > -1) && (nextProps.selection < this.props.data.length);
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
