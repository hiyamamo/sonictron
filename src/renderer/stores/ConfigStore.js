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
      password: localStorage.password || '',
      globalShortcut: localStorage.globalShortcut || false,
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

  getPassword() {
    return this.state.password;
  }

  isEnabledGS() {
    return this.state.globalShortcut;
  }

  // private method
  _save(settings) {
    const { server, user, password, md5Digest, salt, globalShortcut } = settings;
    this.setState({
      server: server,
      user: user,
      password: password,
      md5Digest: md5Digest,
      salt: salt,
      globalShortcut: globalShortcut,
    });

    localStorage.server = server;
    localStorage.user = user;
    localStorage.md5Digest = md5Digest;
    localStorage.salt = salt;
    localStorage.password = password;
    localStorage.globalShortcut = globalShortcut;

    this._ipc.send(IPCKeys.SaveConfig, localStorage);

  }

}
