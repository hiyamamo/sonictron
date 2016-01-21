import React from 'react';
import { formatDuration } from '../../Utils';
import { Icon } from 'react-photonkit';

export default class QueueItem extends React.Component {
  render() {
    return (
      <tr className='queueItem' >
        <td><Icon glyph='cancel' onClick={this._handleRemove.bind(this)} /></td>
        <td onClick={this._handlePlay.bind(this)} >{this.props.song.title}</td>
        <td>{formatDuration(this.props.song.duration)}</td>
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
