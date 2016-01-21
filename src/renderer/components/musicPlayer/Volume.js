import React from 'react';

export default class Volume extends React.Component {

  render() {
    return (
      <div className='volume'>
        <input type='range' min='0' max='100' />
      </div>
    );
  }
}
