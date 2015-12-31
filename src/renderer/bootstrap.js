'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App.js';
import { ipcRenderer } from 'electron';
import IPCKeys from '../common/IPCKeys';
import AppContext from './AppContext';

window.onload = () => {
  const context = new AppContext();
  ipcRenderer.send(IPCKeys.Initialize, localStorage);
  ReactDOM.render(
    <App context={context}/>,
    document.querySelector('.container')
  );
}
