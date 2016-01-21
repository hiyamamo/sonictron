import Component from '../Component';
import React from 'react';
import Controller from './Controller';
import Volume from './Volume';

export default class MusicPlayer extends Component {
  constructor(...args) {
    super(...args);
    this.musicPlayerAction = this.context.actions.musicPlayerAction;
    this.stores = this.context.stores;
    this.actions = this.context.actions;
    this.state = {
      song: {},
      playing: false,
    };
  }

  componentDidMount() {
    this.stores.musicPlayerStore.onChange(this._onChange.bind(this));
    this.stores.queueStore.onChange(this._onChangeQueue.bind(this));
  }

  componentWillUnmount() {
    this.stores.musicPlayerStore.removeAllChangeListeners();
  }

  _onChange() {
    let store = this.stores.musicPlayerStore;
    this.setState({
      playing: store.playing(),
    });
  }

  _onChangeQueue() {
    const newSong = this.stores.queueStore.getNowPlaying();
    this.setState({
      song: newSong,
    });
  }

  render() {
    let glyph = '';
    if (this.state.playing) {
      glyph = 'pause';
    } else {
      glyph = 'play';
    }
    
    return (
      <div className='musicPlayer'>
        <Controller glyph='fast-backward' onClick={this._handlePrev.bind(this)} />
        <Controller ptSize='large' onClick={this._handlePlayOrPause.bind(this)} glyph={glyph} />
        <Controller glyph='fast-forward' onClick={this._handleNext.bind(this)} />
        <Volume />
      </div>
    );
  }

  _handlePlayOrPause(ev) {
    ev.preventDefault();
    let action = this.actions.musicPlayerAction;
    if (this.state.playing) {
      action.pause();
    } else {
      action.resume();
    }
  }

  _handleNext(ev) {
    ev.preventDefault();
    const { queueAction, musicPlayerAction } = this.actions;
    const { queueStore } = this.stores;
    const nextSong = queueStore.getNextSong();
    queueAction.next();
    musicPlayerAction.play(nextSong);
  }
  
  _handlePrev(ev) {
    ev.preventDefault();
    const { queueAction, musicPlayerAction } = this.actions;
    const { queueStore } = this.stores;
    const prevSong = queueStore.getPrevSong();
    queueAction.prev();
    musicPlayerAction.play(prevSong);
  }

}
