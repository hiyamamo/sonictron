import React from 'react';
import SongIcon from './SongIcon';

export default class SongItem extends React.Component { 
  render() {
    return (
      <tr className='songItem' >
        <td>
          <SongIcon glyph='play' title='play' onClick={this._handlePlay.bind(this)} />
          <SongIcon glyph='plus' title='add last' onClick={this._handleAddLast.bind(this)} />
          <SongIcon glyph='right-thin' title='add next' onClick={this._handleAddNext.bind(this)} />
        </td>
        <td>{this.props.song.track}</td>
        <td>{this.props.song.title}</td>
        <td>{this.props.song.album}</td>
        <td>{this.props.song.artist}</td>
      </tr>
    );
  }

  _handleAddFav(ev) {
    this.props.handlers.addFav(ev, this.props.song);
  }

  _handlePlay(ev) {
    this.props.handlers.play(ev, this.props.song);
  }

  _handleAddLast(ev) {
    this.props.handlers.addLast(ev, this.props.song);
  }

  _handleAddNext(ev) {
    this.props.handlers.addNext(ev, this.props.song);
  }
}
