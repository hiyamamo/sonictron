import { Action } from 'material-flux';
import IPCKeys from '../../common/IPCKeys';
import { PlaylistsConstants } from '../constants/Constants';

export default class PlaylistsAction extends Action {

  constructor(context) {
    super(context);
    this._ipc = context.ipc;
    this._ipc.on(IPCKeys.FinishGetPlaylists, this._onFinishGetPlaylists.bind(this));
  }

  load() {
    this._ipc.send(IPCKeys.RequestGetPlaylists);
  }

  _onFinishGetPlaylists(event, response) {
    this.dispatch(PlaylistsConstants.LOAD_PLAYLISTS, response.playlists.playlist);
  }

}
