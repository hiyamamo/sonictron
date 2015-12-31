import React from 'react';
import Component from './Component';
import { ButtonGroup, Button, } from 'react-photonkit';

export default class SidebarButtonGroup extends Component {
  render() {
    return (
      <ButtonGroup>
        <Button glyph='arrows-ccw' onClick={this.props.handleReload}/>
      </ButtonGroup>
    );
  }
}
