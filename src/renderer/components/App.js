'use strict';

import React from 'react';

import Provider from './Provider';
import Config from './Config';
import MusicPlayer from './MusicPlayer';
import Sidebar from './Sidebar';
import Main from './Main';
import { Window, Content, Toolbar, Actionbar, Pane } from 'react-photonkit';

export default class App extends React.Component {

  render() {
    return (
      <Provider context={this.props.context} >
        <Window>
          <Toolbar title="Sonictron">
            <Actionbar>
              <MusicPlayer />
            </Actionbar>
          </Toolbar>
          <Content>
            <Pane ptSize='sm' sidebar>
              <Sidebar />
            </Pane>
            <Pane>
              <Main />
            </Pane>
            <Pane>
              <Config />
            </Pane>
          </Content>
        </Window>
      </Provider>
    );
  }

}
