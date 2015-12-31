import { Action } from 'material-flux';
import IPCKeys from '../../common/IPCKeys';
import { FoldersConstants } from '../constants/Constants';

export default class FoldersAction extends Action {

  constructor(context) {
    super(context);
    this._ipc = context.ipc;
    this._ipc.on(IPCKeys.FinishGetFolders, this._onFinishGetFolders.bind(this));
  }

  load() {
    this._ipc.send(IPCKeys.RequestGetFolders);
  }

  _onFinishGetFolders(event, response) {
    this.dispatch(FoldersConstants.LOAD_FOLDERS, response.musicFolders.musicFolder);
  }

}
