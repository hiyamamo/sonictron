import React from 'react';
import SongListController from './SongListController';

export default class SongListControllerWrapper extends React.Component { 
  render() {
    return (
      <div className='songListControllerWrapper'>
        <SongListController title='Play All' text='Play All'/>
        <SongListController title='Play All' text='Add All'/>
        <SongListController title='Play All' text='Random' last={true} />
      </div>
    );
  }
}
