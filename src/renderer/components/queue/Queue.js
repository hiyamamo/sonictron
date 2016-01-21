import Component from '../Component';
import React from 'react';
import QueueList from './QueueList';
import QueueControllerWrapper from './QueueControllerWrapper';

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

  _handleClearAll(ev) {
    ev.preventDefault();
    this.actions.queueAction.clearAllQueue();
  }

  _handleRemove(ev, index) {
    ev.preventDefault();
    this.actions.queueAction.remove(index);
  }

  _handlePlay(ev, song, index) {
    this.actions.queueAction.play(song, index);
  }

  render() {
    const handlers = {
      onPlay: this._handlePlay.bind(this),
      onClearAll: this._handleClearAll.bind(this),
      onRemove: this._handleRemove.bind(this),
    };
    return (
      <div className='queue'>
        <p className='queueTitle'>Queue</p>
        <QueueControllerWrapper handlers={handlers} />
        <QueueList songs={this.state.songs} handlers={handlers} />
      </div>
    );
  }
}
