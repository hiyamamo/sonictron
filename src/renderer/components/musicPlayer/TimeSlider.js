import React from 'react';
import { formatDuration } from '../../Utils';

export default class TimeSlider extends React.Component {
  render() {
    const time = formatDuration(Math.floor(this.props.time));
    const duration = formatDuration(this.props.duration);
    return (
      <div className='timeSlider'>
        <span>{time}</span>
        <input type='range' min='0' max={duration} value={Math.floor(this.props.time)} />
        <span className='duration'>{duration}</span>
      </div>
    );
  }
}

TimeSlider.defaultProps = {
  duration: 0,
  time: 0,
};
