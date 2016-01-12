import React from 'react';
import SongItem from './SongItem'
import { Table } from 'react-photonkit';

export default class SongList extends React.Component {
  render() {
    const songItems = this.props.songs.map((song) => {
      console.log(song);
      return <SongItem key={song.id} id={song.id} title={song.title} track={song.track} album={song.album} artist={song.artist} handlers={this.props.handlers} />
    });

    return (
      <div className='songList'>
        <Table>
          <tbody>
            {songItems}
          </tbody>
        </Table>
      </div>
    );
  }
}
