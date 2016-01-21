import React from 'react';
import { Icon } from 'react-photonkit';
import classNames from 'classnames';

export default class Controller extends React.Component {
  render() {
    return <Icon className='playerController' ptSize={this.props.ptSize} glyph={this.props.glyph} title={this.props.title} onClick={this.props.onClick} />
  }
}
