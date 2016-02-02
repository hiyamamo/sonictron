import { Context } from 'material-flux';
import { ipcRenderer } from 'electron';

import MainStore from './stores/MainStore';
import SidebarStore from './stores/SidebarStore';
import QueueStore from './stores/QueueStore';
import ConfigStore from './stores/ConfigStore';
import ErrorStore from './stores/ErrorStore';

import MainAction from './actions/MainAction';
import SidebarAction from './actions/SidebarAction';
import QueueAction from './actions/QueueAction';
import ConfigAction from './actions/ConfigAction';
import MusicPlayerAction from './actions/MusicPlayerAction';

export default class AppContext extends Context {
  constructor() {
    super();
    this.ipc = ipcRenderer;

    this.stores = {
      mainStore: new MainStore(this),
      sidebarStore: new SidebarStore(this),
      queueStore: new QueueStore(this),
      configStore: new ConfigStore(this),
      errorStore: new ErrorStore(this),
    };


    this.actions = {
      mainAction: new MainAction(this),
      sidebarAction: new SidebarAction(this),
      queueAction: new QueueAction(this),
      configAction: new ConfigAction(this),
      musicPlayerAction: new MusicPlayerAction(this),
    };
  }
}
