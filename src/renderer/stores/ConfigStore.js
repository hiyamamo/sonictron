'use strict';
import { ConfigConstants } from '../constants/Constants';
import IPCKeys from '../../common/IPCKeys';
import { Store } from 'material-flux';

const SAVE_EVENT = 'save';
export default class ConfigStore extends Store {

  constructor(context) {
    super(context);
    this.state = {
      server: localStorage.server || '',
      user: localStorage.user || '',
      md5Digest: localStorage.md5Digest || '',
      salt: localStorage.salt || '',
    };
    this._ipc = context.ipc;
    this.register(ConfigConstants.SAVE_CONFIG, this._save);
  }


  getServer() {
    return this.state.server;
  }

  getUser() {
    return this.state.user;
  }

  // private method
  _save(server, user, md5Digest, salt) {
    this.setState({
      server: server,
      user: user,
      md5Digest: md5Digest,
      salt: salt,
    });

    localStorage.server = server;
    localStorage.user = user;
    localStorage.md5Digest = md5Digest;
    localStorage.salt = salt;

    this._ipc.send(IPCKeys.SaveServerConfig, localStorage);

  }

}
