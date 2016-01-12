import { Action } from 'material-flux';
import { MainConstants } from '../constants/Constants';
import IPCKeys from '../../common/IPCKeys';

export default class MainAction extends Action {
  constructor(context) {
    super(context);
    this._ipc = context.ipc;
    this._ipc.on(IPCKeys.FinishGetAlbums, this._onFinishGetAlbums.bind(this));
    this._ipc.on(IPCKeys.FinishGetSongs, this._onFinishGetSongs.bind(this));
    this._ipc.on(IPCKeys.FinishGetPlaylist, this._onFinishGetPlaylist.bind(this));
  }

  _onFinishGetAlbums(event, response) {
    this.dispatch(MainConstants.LOAD_ALBUMS, response.directory.child);
  }

  _onFinishGetPlaylist(event, response) {
    this.dispatch(MainConstants.LOAD_SONGS, response.playlist.entry);
  }

  
  _onFinishGetSongs(event, response) {
    this.dispatch(MainConstants.LOAD_SONGS, response.directory.child);
  }

  loadSongs(id) {
    this._ipc.send(IPCKeys.RequestGetSongs, id);
  }

  changeMode(mode) {
    this.dispatch(MainConstants.CHANGE_MODE, mode);
  }
}


