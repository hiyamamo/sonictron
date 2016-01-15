import Component from '../Component';
import React from 'react';
import QueueList from './QueueList';

export default class Main extends Component {
  constructor(...args) {
    super(...args);
    this.actions = this.context.actions;
    this.stores = this.context.stores;
    this.state = {
      songs: [],
    };
  }

  componentDidMount() {
    this.stores.queueStore.onChange(this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.stores.queueStore.removeAllChangeListeners();
  }

  _onChange() {
    const store = this.stores.queueStore;
    this.setState({
      songs: store.getQueue(),
    });
  }

  render() {
    return (
      <div className='queue'>
        <QueueList songs={this.state.songs} />
      </div>
    );
  }
}
