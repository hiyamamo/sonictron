import React from 'react';
import SongListController from './SongListController';

export default class SongListControllerWrapper extends React.Component { 
  render() {
    return (
      <div className='songListControllerWrapper'>
        <SongListController title='Play All' text='Play All' onClick={this.props.handlers.playAll}/>
        <SongListController title='Play All' text='Add All' onClick={this.props.handlers.addAll}/>
        <SongListController title='Play All' text='Random' last={true} onClick={this.props.handlers.playRandom} />
      </div>
    );
  }
}
