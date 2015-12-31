import React from 'react';

export default class Component extends React.Component {

  static get contextTypes() {
    return {
      stores: React.PropTypes.object,
      actions: React.PropTypes.object,
    };
  }
}
