import React from 'react';
import Component from './Component';

export default class ErrToast extends Component {
  componentDidMount() {
    this.context.stores.errorStore.onChange(this._onChange.bind(this));
  }
  componentWillUnmount() {
    this.context.stores.errorStore.removeAllChangeListeners();
  }

  _onChange() {
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
