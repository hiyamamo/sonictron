import { Action } from 'material-flux';
import { ArtistPageConstants } from '../constants/Constants';
import IPCKeys from '../../common/IPCKeys';

export default class ArtistPageAction extends Action {
  constructor(context) {
    super(context);
    this._ipc = context.ipc;
    this._ipc.on(IPCKeys.FinishGetAlbums, this._onFinishGetAlbums.bind(this));
  }

  _onFinishGetAlbums(event, response) {
    this.dispatch(ArtistPageConstants.LOAD_ALBUMS, response.directory.child);
  }
}


