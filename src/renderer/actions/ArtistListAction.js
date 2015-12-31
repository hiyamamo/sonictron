import { Action } from 'material-flux';
import { ArtistListConstants } from '../constants/Constants';
import IPCKeys from '../../common/IPCKeys';

export default class ArtistListAction extends Action {
  constructor(context) {
    super(context);
    this._ipc = context.ipc;
    this._ipc.on(IPCKeys.FinishGetArtists, this._onFinishGetArtists.bind(this));
  }

  load(folderId) {
    this._ipc.send(IPCKeys.RequestGetArtists, folderId);
  }

  getArtist(artistId) {
    this._ipc.send(IPCKeys.RequestGetArtist, artistId);
  }

  _onFinishGetArtists(event, response) {
    this.dispatch(ArtistListConstants.LOAD_ARTISTS, response.indexes);
  }
}

