import React from 'react';
import SongItem from './SongItem'

export default class SongList extends React.Component {
  render() {
    const songItems = this.props.songs.map((song) => {
      return <SongItem key={song.id} id={song.id} title={song.title} onClick={this.props.onClick} />
    });

    return (
      <div className='songList'>
        {songItems}
      </div>
    );
  }
}
