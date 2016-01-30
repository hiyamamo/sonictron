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
      volume: this.stores.queueStore.getVolume(),
      time: 0,
      repeat: this.stores.queueStore.repeat(),
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
      volume: store.getVolume(),
      repeat: store.repeat(),
    });
  }

  render() {
    let glyph = '';
    if (this.state.playing) {
      glyph = 'pause';
    } else {
      glyph = 'play';
    }

    let loopClassName = 'loop';
    let loopOneStyle = {};
    if (this.state.repeat !== 'none') {
      loopClassName = 'loop toggleOn';
    }
    if (this.state.repeat !== 'single') {
      loopOneStyle.display = 'none';
    }

    return (
      <div className='musicPlayer'>
        <div className='playerControllers'>
          <Controller className='prev' glyph='fast-backward' onClick={this._handlePrev.bind(this)} />
          <Controller className='playPause' ptSize='large' onClick={this._handlePlayOrPause.bind(this)} glyph={glyph} />
          <Controller className='next' glyph='fast-forward' onClick={this._handleNext.bind(this)} />
          <div className='loopContainer'>
            <Controller className={loopClassName} glyph='loop' onClick={this._handleRepeat.bind(this)} />
            <div className='loopOne' style={loopOneStyle} >①</div>
          </div>
          <Volume value={this.state.volume} onChange={this._handleVolumeChange.bind(this)} />
        </div>
        <div className='songDisplay'>
          <CoverArt id={this.state.song.coverArt} size='mini' />
          <div>
            <div className='songinfo'>
              <p>{this.state.song.title}</p>
              <p>{this.state.song.artist}</p>
            </div>
            <TimeSlider time={this.state.time} duration={this.state.song.duration} onChange={this._handleTimeSliderChange.bind(this)} />
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
  }

  _handlePrev(ev) {
    ev.preventDefault();
    const { queueAction, musicPlayerAction } = this.actions;
    const { queueStore } = this.stores;
    const prevSong = queueStore.getPrevSong();
    queueAction.prev();
  }

  _handleVolumeChange(ev) {
    this.actions.musicPlayerAction.changeVolume(ev.target.value);
  }

  _handleTimeSliderChange(ev) {
    this.actions.musicPlayerAction.seek(ev.target.value);
  }

  _handleRepeat(ev) {
    ev.preventDefault();
    this.actions.musicPlayerAction.toggleRepeat();
  }

}
