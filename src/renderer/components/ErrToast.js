import React from 'react';
import Component from './Component';
import notifier from 'node-notifier';

export default class ErrToast extends Component {
  constructor(...args) {
    super(...args);
    this.stores = this.context.stores;
  }
  componentDidMount() {
    this.context.stores.errorStore.onChange(this._onChange.bind(this));
  }
  componentWillUnmount() {
    this.context.stores.errorStore.removeAllChangeListeners();
  }

  _onChange() {
    const reason = this.stores.errorStore.reason();
    const message = this.stores.errorStore.message();
    const errorMessage = reason + '\n' + message;
    notifier.notify({
      title: 'Error Message',
      message: errorMessage,
    });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
