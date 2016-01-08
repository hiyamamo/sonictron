import React from 'react';
import { ButtonGroup, Button, } from 'react-photonkit';

export default class SidebarButtonGroup extends React.Component {
  render() {
    return (
      <ButtonGroup>
        <Button glyph='arrows-ccw' onClick={this.props.handleReload}/>
      </ButtonGroup>
    );
  }
}
