'use strict';

import { app, BrowserWindow, ipcMain } from 'electron';
import SubSonicApiService from './service/SubSonicApiService';
import IPCKeys from '../common/IPCKeys';
import * as Menu from './menu';
import globalShortcut from './globalShortcut';
import playingStatus from './playingStatus';


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
    autoHideMenuBar: false,
  });
  mainWindow.loadURL('file://' + __dirname + '/../renderer/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  Menu.initMenu();

  SubSonicApiService.listen(ipcMain);
  ipcMain.on(IPCKeys.Initialize, (event, settings) => {
    _setGlobalShortcut(settings.globalShortcut, mainWindow);
    SubSonicApiService.onSaveServerConfig(event, settings);
  });

  ipcMain.on(IPCKeys.SaveConfig, (event, settings) => {
    _setGlobalShortcut(settings.globalShortcut, mainWindow);
    SubSonicApiService.onSaveServerConfig(event, settings);
  });
  ipcMain.on(IPCKeys.Play, onPlay.bind(this));
  ipcMain.on(IPCKeys.Pause, onPause.bind(this));
});

function _setGlobalShortcut(enabled, win) {
  if (enabled === "true") {
    globalShortcut.register(win);
  } else {
    globalShortcut.unregister();
  }
}

function onPlay(event) {
  playingStatus.playing = true;
  Menu.onPlay();
}

function onPause(event) {
  playingStatus.playing = false;
  Menu.onPause();
}
