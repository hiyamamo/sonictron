import React from 'react';
import { Icon } from 'react-photonkit';
import { getPtClassSet } from '../common/Utils';
import classNames from 'classnames';

export default class Controller extends React.Component {
  render() {
    let classes = getPtClassSet('playerController');
    const className = classNames(this.props.className, classes);
    return <Icon className={className} ptSize={this.props.ptSize} glyph={this.props.glyph} title={this.props.title} onClick={this.props.onClick} />
  }
}
