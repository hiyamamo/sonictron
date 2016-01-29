import React from 'react';
import { Table } from 'react-photonkit';
import QueueItem from './QueueItem';

export default class QueueList extends React.Component {
  render() {
    const queueItems = this.props.songs.map((song, idx) => {
      const nowPlaying = this.props.nowSong.id === song.id;
      return <QueueItem key={idx} nowPlaying={nowPlaying} song={song} index={idx} onPlay={this.props.handlers.onPlay} onRemove={this.props.handlers.onRemove} />
    });
    return (
      <div className='queueList'>
        <Table>
          <tbody>
            {queueItems}
          </tbody>
        </Table>
      </div>
    );
  }
}
