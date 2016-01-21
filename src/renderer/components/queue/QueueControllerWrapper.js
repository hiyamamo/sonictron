import React from 'react';
import QueueController from './QueueController';

export default class QueueControllerWrapper extends React.Component {
  render() {
    return (
      <div className='queueControllerWrapper'>
        <QueueController title='Clear All' glyph='trash' onClick={this.props.handlers.onClearAll} />
      </div>
    );
  }
}
