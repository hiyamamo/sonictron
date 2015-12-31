import Component from './Component';
import React from 'react';

export default class Volume extends Component {

  render() {
    return (
      <div className='volume'>
        <div id='volume-line'></div>
        <div id='volume-circle'></div>
      </div>
    );
  }
}
