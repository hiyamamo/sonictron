import React from 'react';
import { formatDuration } from '../../Utils';
import { Icon } from 'react-photonkit';

export default class QueueItem extends React.Component {
  render() {
    let playingIcon = null;
    if (this.props.nowPlaying) {
      playingIcon = <Icon glyph='play' />
    }
    return (
      <tr className='queueItem' >
        <td className='queueIcon' >{playingIcon}</td>
        <td className='queueIcon'><Icon glyph='cancel' onClick={this._handleRemove.bind(this)} /></td>
        <td className='queueTitle' onClick={this._handlePlay.bind(this)} >{this.props.song.title}</td>
        <td className='queueDuration'>{formatDuration(this.props.song.duration)}</td>
      </tr>
    );
  }

  _handlePlay(ev) {
    this.props.onPlay(ev, this.props.song, this.props.index);
  }

  _handleRemove(ev) {
    this.props.onRemove(ev, this.props.index);
  }
}
