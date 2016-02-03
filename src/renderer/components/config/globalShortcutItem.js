import React from 'react';

export default class GlobalShortcutItem extends React.Component {
  render() {
    return (
      <div className='globalShortcutItem'>
        <span className='shortcutAccelerator'>{this.props.accelerator}</span>
        <span className='shortcutText' >{this.props.text}</span>
      </div>
    );
  }
}
