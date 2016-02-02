'use strict';

import { app, BrowserWindow, ipcMain } from 'electron';
import SubSonicApiService from './service/SubSonicApiService';
import IPCKeys from '../common/IPCKeys';
import * as Menu from './menu';


let mainWindow;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin')
    app.quit();
});

Menu.initMenu();

app.on('ready', () => {

  mainWindow = new BrowserWindow({
    width: 1420,
    height: 840,
    minWidth: 1420,
    autoHideMenuBar: false,
  });
  mainWindow.loadURL('file://' + __dirname + '/../renderer/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  SubSonicApiService.listen(ipcMain);
  ipcMain.on(IPCKeys.Initialize, (event, localStorage) => {
    SubSonicApiService.onSaveServerConfig(event, localStorage);
  });
  ipcMain.on(IPCKeys.Play, Menu.onPlaySong.bind(this));
  ipcMain.on(IPCKeys.Pause, Menu.onPauseSong.bind(this));
});

