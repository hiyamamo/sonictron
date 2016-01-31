import React from 'react';
import { Icon } from 'react-photonkit';
import classNames from 'classnames';
import { getPtClassSet } from './Utils';

export default class Button extends React.Component {

  _getIconComponent() {
    const withText = this.props.text ? true : false;
    if (this.props.glyph) {
      return <Icon glyph={this.props.glyph} withText={withText} />
    } else {
      return null;
    }
  }

  render() {
    const icon = this._getIconComponent();
    const ptSize = this.props.ptSize || 'default';
    let classes = getPtClassSet('mybtn', ptSize);
    const className = classNames(this.props.className, classes);
    return (
      <button
        {...this.props}
        className={className}
        onClick={this.props.onClick}
        >
        {icon}{this.props.text}
      </button>
    );
  }

}
