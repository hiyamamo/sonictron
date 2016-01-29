import Component from '../Component';
import React from 'react';
import Controller from './Controller';
import Volume from './Volume';
import CoverArt from '../common/CoverArt';
import TimeSlider from './TimeSlider';

export default class MusicPlayer extends Component {
  constructor(...args) {
    super(...args);
    this.musicPlayerAction = this.context.actions.musicPlayerAction;
    this.stores = this.context.stores;
    this.actions = this.context.actions;
    this.state = {
      song: {},
      playing: false,
      time: 0,
    };
  }

  componentDidMount() {
    this.stores.queueStore.onChange(this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.stores.queueStore.removeAllChangeListeners();
  }

  _onChange() {
    let store = this.stores.queueStore;
    const newSong = store.getNowPlaying() || {}; 
    this.setState({
      playing: store.playing(),
      time: store.currentTime(),
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
        <div className='playerControllers'>
          <Controller className='prev' glyph='fast-backward' onClick={this._handlePrev.bind(this)} />
          <Controller className='playPause' ptSize='large' onClick={this._handlePlayOrPause.bind(this)} glyph={glyph} />
          <Controller className='next' glyph='fast-forward' onClick={this._handleNext.bind(this)} />
          <Controller className='loop' glyph='loop' />
          <Volume />
        </div>
        <div className='songDisplay'>
          <CoverArt id={this.state.song.coverArt} size='mini' />
          <div>
            <div className='songinfo'>
              <p>{this.state.song.title}</p>
              <p>{this.state.song.artist}</p>
            </div>
            <TimeSlider time={this.state.time} duration={this.state.song.duration} />
          </div>
        </div>
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
