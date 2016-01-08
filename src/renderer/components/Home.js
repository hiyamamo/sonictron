'use strict';

import React from 'react';
import Component from './Component';
import Config from './Config';
import MusicPlayer from './MusicPlayer';
import Sidebar from './sidebar/Sidebar';
import Main from './main/Main';
import { Window, Content, Toolbar, Actionbar, Pane } from 'react-photonkit';

export default class Home extends Component {

  render() {
    return (
      <Content>
        <Pane ptSize='sm' sidebar>
          <Sidebar />
        </Pane>
        <Pane>
          <Main />
        </Pane>
        <Pane ptSize='sm'>
        </Pane>
      </Content>
    );
  }

}
