import Component from './Component';
import React from 'react';
import { Button } from 'react-photonkit';

export default class MusicPlayer extends Component {
  constructor(...args) {
    super(...args);
    this.musicPlayerAction = this.context.actions.musicPlayerAction;
  }

  render() {
    return (
      <div className='musicPlayer'>
        <Button ptSize='large' onClick={this._handlePlay.bind(this)} glyph='play' />
        <Button ptSize='large' onClick={this._handleStop.bind(this)} glyph='stop' />
      </div>
    );
  }

  _handlePlay(event) {
    event.preventDefault();
    let song = {};
    this.musicPlayerAction.play(song);
  }

  _handleStop(event) {
    event.preventDefault();
    this.musicPlayerAction.stop();
  }
}
