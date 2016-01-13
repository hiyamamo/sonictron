import React from 'react';

export default class SongListController extends React.Component { 
  constructor(...args) {
    super(...args);
  }

  render() {
    let divider = <span className='divider'>|</span>;
    if(this.props.last) {
      divider = null;
    }
    return (
      <span className='songListController' title={this.props.title} onClick={this.props.onClick} >
        <a>{this.props.text}</a>
        {divider}
      </span>
    );
  }
}
