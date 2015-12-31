import React from 'react';

export default class Provider extends React.Component {

  static get childContextTypes() {
    return {
      stores: React.PropTypes.object,
      actions: React.PropTypes.object,
    }
  };
  getChildContext() {
    return {
      stores: this.props.context.stores,
      actions: this.props.context.actions,
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
