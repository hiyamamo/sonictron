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
  }

  render() {
    let glyph = '';
    if (this.stores.musicPlayerStore.playing()) {
      glyph = 'pause';
    } else {
      glyph = 'play';
    }
    
    return (
      <div className='musicPlayer'>
        <Controller glyph='fast-backward' />
        <Controller ptSize='large' onClick={this._handlePlay.bind(this)} glyph={glyph} />
        <Controller glyph='fast-forward' />
        <Volume />
      </div>
    );
  }

  _handlePlay(event) {
    event.preventDefault();
  }

}
