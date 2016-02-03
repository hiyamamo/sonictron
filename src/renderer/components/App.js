'use strict';

import React from 'react';

import Provider from './Provider';
import Config from './config/Config';
import MusicPlayer from './musicPlayer/MusicPlayer';
import Sidebar from './sidebar/Sidebar';
import Main from './main/Main';
import ErrToast from './ErrToast';
import AppContext from '../AppContext';

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
        {this.props.children}
        <ErrToast />
      </Provider>
    );
  }

}
