import React from 'react';
import { getCoverArtURL } from '../../Utils';

export default class AlbumItem extends React.Component {
  render() {
    const coverArtUrl = getCoverArtURL(this.props.art);
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
    ev.target.src = '../images/albumdefault.jpg';
  }

  _handleClick(ev) {
    ev.preventDefault();
    this.props.onClick(ev, this.props.id, this.props.art, this.props.title);
  }
}
