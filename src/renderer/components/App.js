'use strict';

import React from 'react';

import Provider from './Provider';
import Config from './Config';
import MusicPlayer from './musicPlayer/MusicPlayer';
import Sidebar from './sidebar/Sidebar';
import Main from './main/Main';
import { Window, Content, Toolbar, Actionbar, Pane } from 'react-photonkit';
import AppContext from '../AppContext';
import { Link } from 'react-router';

export default class App extends React.Component {
  constructor(...args) {
    super(...args);
    this._context = new AppContext();
  }

  render() {
    return (
      <Provider context={this._context} >
        <Window>
          <Toolbar title="Sonictron">
            <Actionbar>
              <MusicPlayer />
              <Link to='config'>Config</Link>
              <Link to='/'>Home</Link>
            </Actionbar>
          </Toolbar>
          {this.props.children}
        </Window>
      </Provider>
    );
  }

}
