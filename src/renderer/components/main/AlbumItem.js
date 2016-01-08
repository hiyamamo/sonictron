import React from 'react';
import { buildURL } from '../../../common/Utils';
import { Col } from 'react-bootstrap';

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
      <Col xs={4} >
        <a href='#' className='albumItem' onClick={this._handleClick.bind(this)} >
          <img src={coverArtUrl} alt='coverart' onError={this.onError} />
          <span>{this.props.title}</span>
        </a>
      </Col>
    );

  }

  onError(ev) {
    ev.target.src = '../../images/albumdefault.jpg';
  }

  _handleClick(ev) {
    ev.preventDefault();
    this.props.onClick(ev, this.props.id);
  }
}
