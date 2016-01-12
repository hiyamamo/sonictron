import React from 'react';
import SongItem from './SongItem'
import { Table } from 'react-photonkit';
import { buildURL } from '../../../common/Utils';

export default class SongList extends React.Component {
  render() {
    const songItems = this.props.songs.map((song) => {
      return <SongItem key={song.id} song={song} handlers={this.props.handlers} />
    });

    const settings = {
      server: localStorage.server,
      user: localStorage.user,
      md5Digest: localStorage.md5Digest,
      salt: localStorage.salt,
    };

    const params = {
      id: this.props.coverArt,
      size: 160,
    };

    const coverArtUrl = buildURL('getCoverArt', params, settings);

    return (
      <div className='songList'>
        <img src={coverArtUrl} alr='coverart' onError={this.onError} />
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
