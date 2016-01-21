import React from 'react';
import { Icon } from 'react-photonkit';

export default class QueueController extends React.Component { 
  render() {
    return (
      <Icon className='queueController' glyph={this.props.glyph} title={this.props.title} onClick={this.props.onClick} />
    );
  }
}
