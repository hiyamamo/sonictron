import { Action } from 'material-flux';
import { ArtistListConstants, MainConstants, } from '../constants/Constants';
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

  loadArtistPage(artistId, artistName) {
    this._ipc.send(IPCKeys.RequestGetAlbums, artistId);
    this.dispatch(MainConstants.LOAD_ARTIST_NAME, artistName);
  }

  _onFinishGetArtists(event, response) {
    this.dispatch(ArtistListConstants.LOAD_ARTISTS, response.indexes);
  }
}

