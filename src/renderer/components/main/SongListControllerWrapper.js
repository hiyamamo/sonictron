import React from 'react';
import SongListController from './SongListController';

export default class SongListControllerWrapper extends React.Component { 
  render() {
    return (
      <div className='songListControllerWrapper'>
        <SongListController title='Play All' text='Play All' onClick={this.props.handlers.playAll}/>
        <SongListController title='Add All' text='Add All' onClick={this.props.handlers.addAll}/>
        <SongListController title='Play Random' text='Play Random' last={true} onClick={this.props.handlers.playRandom} />
      </div>
    );
  }
}
