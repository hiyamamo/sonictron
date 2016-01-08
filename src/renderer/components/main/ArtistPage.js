import React from 'react';
import AlbumList from './AlbumList';

export default class ArtistPage extends React.Component {
  render() {
    return (
      <div>
        <span>{this.props.name}</span>
        <AlbumList albums={this.props.albums} onClick={this.props.onClick} />
      </div>
    );
  }
}
