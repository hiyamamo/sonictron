import React from 'react';
import Button from '../common/Button';

export default class SidebarButtonGroup extends React.Component {
  render() {
    return (
      <Button glyph='arrows-ccw' onClick={this.props.handleReload}/>
    );
  }
}
