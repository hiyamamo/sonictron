import React from 'react';
import { formatDuration } from '../../Utils';

export default class QueueItem extends React.Component {
  render() {
    return (
      <tr className='queueItem' >
        <td>{this.props.song.title}</td>
        <td>{formatDuration(this.props.song.duration)}</td>
      </tr>
    );
  }
}
