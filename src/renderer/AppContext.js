import { Context } from 'material-flux';
import { ipcRenderer } from 'electron';
import ArtistListStore from './stores/ArtistListStore';
import FoldersStore from './stores/FoldersStore';
import PlaylistsStore from './stores/PlaylistsStore';
import ConfigStore from './stores/ConfigStore';
import MusicPlayerStore from './stores/MusicPlayerStore';
import ArtistListAction from './actions/ArtistListAction';
import FoldersAction from './actions/FoldersAction';
import PlaylistsAction from './actions/PlaylistsAction';
import ConfigAction from './actions/ConfigAction';
import MusicPlayerAction from './actions/MusicPlayerAction';
import ErrorAction from './actions/ErrorAction';

export default class AppContext extends Context {
  constructor() {
    super();
    this.ipc = ipcRenderer;

    this.stores = {
      artistListStore: new ArtistListStore(this),
      foldersStore: new FoldersStore(this),
      playlistsStore: new PlaylistsStore(this),
      configStore: new ConfigStore(this),
      musicPlayerStore: new MusicPlayerStore(this),
    };


    this.actions = {
      artistListAction: new ArtistListAction(this),
      foldersAction: new FoldersAction(this),
      playlistsAction: new PlaylistsAction(this),
      configAction: new ConfigAction(this),
      musicPlayerAction: new MusicPlayerAction(this),
      errorAction : new ErrorAction(this),
    };
  }
}
