import React from 'react';

export default class Volume extends React.Component {

  render() {
    let actualStyle = {};
    const actualWidth = 120 / 100 * this.props.value - this.props.value * 0.12;
    if (!isNaN(actualWidth)) {
      actualStyle.width = actualWidth;
    }

    return (
      <span className='volume'>
        <div className='actual' style={actualStyle} ></div>
        <input type='range' min='0' max='100' value={this.props.value} defaultValue={this.props.value} onChange={this.props.onChange} />
      </span>
    );
  }
}
