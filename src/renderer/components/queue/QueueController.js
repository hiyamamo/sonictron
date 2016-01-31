import React from 'react';
import Button from '../common/Button';

export default class QueueController extends React.Component { 
  render() {
    return (
      <Button className='queueController' glyph={this.props.glyph} title={this.props.title} onClick={this.props.onClick} />
    );
  }
}
