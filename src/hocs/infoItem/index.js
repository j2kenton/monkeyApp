import React, { Component } from 'react';

export default function carousel(WrappedComponent) {
  return class extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      const isMsgValid = (typeof nextProps.infoMsg === "string");
      const isIconValid = (typeof nextProps.infoIcon === "string");
      const isInfoChanged = (this.props.infoMsg !== nextProps.infoMsg);
      return isMsgValid && isInfoChanged && isIconValid;
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };
}
