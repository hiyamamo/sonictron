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

  mainWindow = new BrowserWindow({ width: 1150, height: 840, 'title-bar-style': 'hidden', });
  mainWindow.loadURL('file://' + __dirname + '/../renderer/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  SubSonicApiService.listen(ipcMain);
  ipcMain.on(IPCKeys.Initialize, (event, localStorage) => {
    SubSonicApiService.onSaveServerConfig(event, localStorage);
  });
});
