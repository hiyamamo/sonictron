'use strict';

import React from 'react';
import Component from './Component';
import Sidebar from './sidebar/Sidebar';
import Main from './main/Main';
import Navigation from './common/Navigation';
import Queue from './queue/Queue';
import MusicPlayer from './musicPlayer/MusicPlayer';
import { Window, PaneGroup, Content, Toolbar, Actionbar, Pane } from 'react-photonkit';

export default class Home extends Component {

  render() {
    return (
      <Window>
        <Toolbar>
          <Actionbar>
            <MusicPlayer />
            <Navigation to='config' glyph='cog' />
          </Actionbar>
        </Toolbar>
        <Content>
          <PaneGroup>
            <Pane ptSize='sm' sidebar>
              <Sidebar />
            </Pane>
            <Pane>
              <Main />
            </Pane>
            <Pane className='pane-m'>
              <Queue />
            </Pane>
          </PaneGroup>
        </Content>
      </Window>
    );
  }

}
