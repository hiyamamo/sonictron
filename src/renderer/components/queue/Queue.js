import Component from '../Component';
import React from 'react';

export default class Main extends Component {
  constructor(...args) {
    super(...args);
    this.actions = this.context.actions;
    this.stores = this.context.stores;
  }

  render() {
    return (
      <div className='queue'>
        queue
      </div>
    );
  }
}
