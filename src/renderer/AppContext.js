import { Context } from 'material-flux';
import { ipcRenderer } from 'electron';
import MainStore from './stores/MainStore';
import SidebarStore from './stores/SidebarStore';
import ConfigStore from './stores/ConfigStore';
import MusicPlayerStore from './stores/MusicPlayerStore';
import MainAction from './actions/MainAction';
import SidebarAction from './actions/SidebarAction';
import ConfigAction from './actions/ConfigAction';
import MusicPlayerAction from './actions/MusicPlayerAction';
import ErrorAction from './actions/ErrorAction';

export default class AppContext extends Context {
  constructor() {
    super();
    this.ipc = ipcRenderer;

    this.stores = {
      mainStore: new MainStore(this),
      sidebarStore: new SidebarStore(this),
      configStore: new ConfigStore(this),
      musicPlayerStore: new MusicPlayerStore(this),
    };


    this.actions = {
      mainAction: new MainAction(this),
      sidebarAction: new SidebarAction(this),
      configAction: new ConfigAction(this),
      musicPlayerAction: new MusicPlayerAction(this),
      errorAction : new ErrorAction(this),
    };
  }
}
