import React from 'react';

export default class SongItem extends React.Component { 
  render() {
    return (
      <a href='#' className='songItem' onClick={this._handleClick.bind(this)} >
      {this.props.title}
      </a>
    );
  }

  _handleClick(ev) {
    ev.preventDefault();
    this.props.onClick(ev, this.props.id);
  }
}
