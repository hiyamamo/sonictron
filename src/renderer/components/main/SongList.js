import React from 'react';
import SongItem from './SongItem'
import SongListControllerWrapper from './SongListControllerWrapper';
import { Table } from 'react-photonkit';
import { getCoverArtURL } from '../../Utils';

export default class SongList extends React.Component {
  render() {
    const songItems = this.props.songs.map((song) => {
      return <SongItem key={song.id} song={song} handlers={this.props.handlers} />
    });

    const coverArtUrl = getCoverArtURL(this.props.coverArt);

    return (
      <div className='songList'>
        <img src={coverArtUrl} alt='coverart' onError={this.onError} />
        <SongListControllerWrapper handlers={this.props.handlers} />
        <Table>
          <tbody>
            {songItems}
          </tbody>
        </Table>
      </div>
    );
  }

  onError(ev) {
    ev.target.src = '../../images/albumdefault.jpg';
  }

}
