import React from 'react';

export default class Volume extends React.Component {

  render() {
    return (
      <span className='volume'>
        <input type='range' min='0' max='100' defaultValue={this.props.value} onChange={this.props.onChange} />
      </span>
    );
  }
}
