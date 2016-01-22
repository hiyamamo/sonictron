'use strict';

import { app, BrowserWindow, ipcMain } from 'electron';
import SubSonicApiService from './service/SubSonicApiService';
import IPCKeys from '../common/IPCKeys';


let mainWindow;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', () => {

  mainWindow = new BrowserWindow({
    width: 1420,
    height: 840,
    minWidth: 1420,
    'title-bar-style': 'hidden',
    autoHideMenuBar: true,
  });
  mainWindow.loadURL('file://' + __dirname + '/../renderer/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  SubSonicApiService.listen(ipcMain);
  ipcMain.on(IPCKeys.Initialize, (event, localStorage) => {
    SubSonicApiService.onSaveServerConfig(event, localStorage);
  });
});

