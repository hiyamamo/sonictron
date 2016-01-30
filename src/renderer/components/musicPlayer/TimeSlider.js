import React from 'react';
import { formatDuration } from '../../Utils';

export default class TimeSlider extends React.Component {
  render() {
    const time = formatDuration(Math.floor(this.props.time));
    const duration = formatDuration(this.props.duration);
    let playedStyle = {};
    const playedTime = this.props.time * (700 / this.props.duration) + 2;

    if (!isNaN(playedTime)) {
      playedStyle.width = playedTime;
    }

    return (
      <div className='timeSlider'>
        <span className='time'>{time}</span>
        <div className='playedSlider' style={playedStyle} ></div>
        <input type='range' min='0' max={this.props.duration} value={Math.floor(this.props.time)} onChange={this.props.onChange} />
        <span className='duration'>{duration}</span>
      </div>
    );
  }
}

TimeSlider.defaultProps = {
  duration: 0,
  time: 0,
};
