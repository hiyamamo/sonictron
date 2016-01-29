'use strict';

import React from 'react';

import Provider from './Provider';
import Config from './Config';
import MusicPlayer from './musicPlayer/MusicPlayer';
import Sidebar from './sidebar/Sidebar';
import Main from './main/Main';
import { Window, Content, Toolbar, Actionbar, Pane } from 'react-photonkit';
import AppContext from '../AppContext';
import Navigation from './Navigation'

export default class App extends React.Component {
  constructor(...args) {
    super(...args);
    this._context = new AppContext();
  }

  render() {
    var configStyle = {
      width: '40px',
      marginLeft: 'auto',
    };
    return (
      <Provider context={this._context} >
        <Window>
          {this.props.children}
        </Window>
      </Provider>
    );
  }

}
