import { Store } from 'material-flux';
import IPCKeys from '../../common/IPCKeys';

export default class ErrorStore extends Store {
  constructor(context) {
    super(context);
    this.state = {
      error: "",
      message: "",
    };
    this._ipc = context.ipc;
    this._ipc.on(IPCKeys.SendErrorMessage, this._onError.bind(this));
  }

  _onError(event, error) {
    let message = '';
    if (error.subsonicError) {
      message = error.subsonicError.message;
    }
    this.setState({
      reason: error.reason,
      message: message,
    });
  }
}
