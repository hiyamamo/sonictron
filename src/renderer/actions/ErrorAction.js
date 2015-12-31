import { Action } from 'material-flux';
import { ErrorConstants } from '../constants/Constants';
import IPCKeys from '../../common/IPCKeys';

export default class ArtistListAction extends Action {
  constructor(context) {
    super(context);
    this._ipc = context.ipc;
    this._ipc.on(IPCKeys.SendErrorMessage, this._handleErrors.bind(this));
  }

  _handleErrors(event, error) {
    console.log(error);
  }
}

