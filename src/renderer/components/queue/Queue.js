import Component from '../Component';
import React from 'react';
import QueueList from './QueueList';
import QueueControllerWrapper from './QueueControllerWrapper';

export default class Queue extends Component {
  constructor(...args) {
    super(...args);
    this.actions = this.context.actions;
    this.stores = this.context.stores;
    this.state = {
      songs: this.stores.queueStore.getQueue(),
      nowSong: this.stores.queueStore.getNowPlaying(),
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
      nowSong: store.getNowPlaying(),
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

  _handleShuffle(ev) {
    ev.preventDefault();
    this.actions.queueAction.shuffle();
  }

  render() {
    const handlers = {
      onPlay: this._handlePlay.bind(this),
      onClearAll: this._handleClearAll.bind(this),
      onRemove: this._handleRemove.bind(this),
      onShuffle: this._handleShuffle.bind(this),
    };
    return (
      <div className='queue'>
        <p className='queueTitle'>Queue</p>
        <QueueControllerWrapper handlers={handlers} />
        <QueueList nowSong={this.state.nowSong} songs={this.state.songs} handlers={handlers} />
      </div>
    );
  }
}
