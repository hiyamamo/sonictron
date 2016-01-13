import React from 'react';
import { buildURL } from '../../../common/Utils';

export default class AlbumItem extends React.Component {
  render() {
    const settings = {
      server: localStorage.server,
      user: localStorage.user,
      md5Digest: localStorage.md5Digest,
      salt: localStorage.salt,
    };

    const params = {
      id: this.props.art,
      size: 160,
    };

    const coverArtUrl = buildURL('getCoverArt', params, settings);
    return (
      <div title={this.props.title} className='albumItem'>
        <a href='#' onClick={this._handleClick.bind(this)} >
          <img src={coverArtUrl} alt='coverart' onError={this.onError} />
          <span>{this.props.title}</span>
        </a>
      </div>
    );

  }

  onError(ev) {
    ev.target.src = '../../images/albumdefault.jpg';
  }

  _handleClick(ev) {
    ev.preventDefault();
    this.props.onClick(ev, this.props.id, this.props.art);
  }
}
