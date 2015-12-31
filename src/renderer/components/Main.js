import Component from './Component';
import React from 'react';

export default class Main extends Component {
  constructor(...args) {
    super(...args);
    this.actions = this.context.actions;
    this.stores = this.context.stores;

    this.state = {
      mode: 'albums',
    };
  }


  render() {
    return (
      <div className='main' >
      </div>
    );
  }
}
