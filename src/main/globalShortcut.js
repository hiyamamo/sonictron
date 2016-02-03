import { globalShortcut } from 'electron';
import IPCKeys from '../common/IPCKeys';
import { isPlaying } from './playingStatus';

function register(win) {
  globalShortcut.register('CmdOrCtrl+Shift+Space', () => { 
    if (isPlaying()) {
      win.webContents.send(IPCKeys.RequestPause);
    } else {
      win.webContents.send(IPCKeys.RequestPlay);
    }
  });

  globalShortcut.register('CmdOrCtrl+Shift+Right', () => {
    win.webContents.send(IPCKeys.RequestNext);
  });

  globalShortcut.register('CmdOrCtrl+Shift+Left', () => {
    win.webContents.send(IPCKeys.RequestPrev);
  });

  globalShortcut.register('CmdOrCtrl+Shift+Up', () => {
    win.webContents.send(IPCKeys.RequestIncreseVolume);
  });

  globalShortcut.register('CmdOrCtrl+Shift+Down', () => {
    win.webContents.send(IPCKeys.RequestDecreaseVolume);
  });

}

function unregister() {
  globalShortcut.unregisterAll();
}

export default {
  register: register,
  unregister: unregister,
};
