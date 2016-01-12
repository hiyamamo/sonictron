import React from 'react';
import AlbumItem from './AlbumItem';

export default class AlbumList extends React.Component {
  render() {
    const albumItems = this.props.albums.map((album) => {
      return <AlbumItem key={album.id} id={album.id} title={album.title} art={album.coverArt} onClick={this.props.onClick} />
    });

    return (
      <div className='albumList'>
        {albumItems}
      </div>
    );
  }
}

