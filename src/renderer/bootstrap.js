'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import { Router } from 'react-router';
import { ipcRenderer } from 'electron';
import IPCKeys from '../common/IPCKeys';
import routes from './routes';

window.onload = () => {
  ipcRenderer.send(IPCKeys.Initialize, localStorage);
  ReactDOM.render(
    (
      <Router>
        {routes}
      </Router>
    ),
    document.querySelector('.container')
  );
}
