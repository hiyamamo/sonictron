import { Menu, app } from 'electron';
import IPCKeys from '../common/IPCKeys';

const template = [
  {
    label: 'Player',
    submenu: [
      {
        label: 'Play',
        accelerator: 'Shift+Space',
        click: onClickPlayPause,
      },
      {
        label: 'Previous',
        accelerator: 'Shift+Left',
        click: (menu, win) => {
          win.webContents.send(IPCKeys.RequestPrev);
        }
      },
      {
        label: 'Next',
        accelerator: 'Shift+Right',
        click: (menu, win) => {
          win.webContents.send(IPCKeys.RequestNext);
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Increese Volume',
        accelerator: 'Shift+Up',
        click: (menu, win) => {
          win.webContents.send(IPCKeys.RequestIncreseVolume);
        }
      },
      {
        label: 'Decrease Volume',
        accelerator: 'Shift+Down',
        click: (menu, win) => {
          win.webContents.send(IPCKeys.RequestDecreaseVolume);
        }
      },
      {
        label: 'Mute',
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
          else
            return 'F11';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      },
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        role: 'minimize'
      },
      {
        label: 'Close',
        role: 'close'
      },
    ],
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'About',
      },
    ],
  },
];
export function initMenu() {

  if (process.env.NODE_ENV !== 'production') {
    template[1].submenu.push({
        label: 'Toggle Developer Tools',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Alt+Command+I';
          else
            return 'Ctrl+Shift+I';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.toggleDevTools();
        }
      });
  }

  if (process.platform == 'darwin') {
    var name = app.getName();
    template.unshift({
      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() { app.quit(); }
        },
      ]
    });
  }
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}


const playPauseMenuItem = {
  accelerator: 'Shift+Space',
  click: onClickPlayPause,
};

export function onPlaySong() {
  const menuItem = playPauseMenuItem;
  menuItem.label = 'Play';
  togglePlayPause(menuItem);
}

export function onPauseSong() {
  const menuItem = playPauseMenuItem;
  menuItem.label = 'Pause';
  togglePlayPause(menuItem);
}

function onClickPlayPause(menuItem, win) {
  let req = '';
  if (menuItem.label === 'Play') {
    req = IPCKeys.RequestPlay;
  } else {
    req = IPCKeys.RequestPause;
  }

  win.webContents.send(req);
}

function togglePlayPause(menuItem) {
  if (menuItem.label === 'Play') {
    menuItem.label = 'Pause';
  } else {
    menuItem.label = 'Play';
  }
  template[0].submenu[0] = menuItem;
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
