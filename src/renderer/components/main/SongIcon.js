import React from 'react';
import { Icon } from 'react-photonkit';

export default class SongIcon extends React.Component { 
  render() {
    return (
      <Icon className='songIcon' glyph={this.props.glyph} title={this.props.title} onClick={this.props.onClick}/>
    );
  }
}
