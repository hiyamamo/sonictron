import { Action } from 'material-flux';
import IPCKeys from '../../common/IPCKeys';
import { SidebarConstants, MainConstants } from '../constants/Constants';

export default class SidebarAction extends Action {
  constructor(context) {
    super(context);
    this._ipc = context.ipc;
    this._ipc.on(IPCKeys.FinishGetArtists, this._onFinishGetArtists.bind(this));
    this._ipc.on(IPCKeys.FinishGetPlaylists, this._onFinishGetPlaylists.bind(this));
    this._ipc.on(IPCKeys.FinishGetFolders, this._onFinishGetFolders.bind(this));
  }

  loadArtists(folderId) {
    this._ipc.send(IPCKeys.RequestGetArtists, folderId);
  }

  loadAlbums(artistId, artistName) {
    this._ipc.send(IPCKeys.RequestGetAlbums, artistId);
    this.dispatch(MainConstants.CHANGE_MODE, 'album');
    this.dispatch(MainConstants.SET_TITLE, artistName);
  }

  loadSongsInPlaylist(id, name) {
    this._ipc.send(IPCKeys.RequestGetPlaylist, id);
    this.dispatch(MainConstants.CHANGE_MODE, 'song');
    this.dispatch(MainConstants.SET_TITLE, name);
  }

  _onFinishGetArtists(event, response) {
    this.dispatch(SidebarConstants.LOAD_ARTISTS, response.indexes);
  }

  loadPlaylists() {
    this._ipc.send(IPCKeys.RequestGetPlaylists);
  }

  _onFinishGetPlaylists(event, response) {
    this.dispatch(SidebarConstants.LOAD_PLAYLISTS, response.playlists.playlist);
  }

  loadFolders() {
    this._ipc.send(IPCKeys.RequestGetFolders);
  }

  _onFinishGetFolders(event, response) {
    this.dispatch(SidebarConstants.LOAD_FOLDERS, response.musicFolders.musicFolder);
  }

}
