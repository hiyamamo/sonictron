'use strict';

import { ConfigConstants } from '../constants/Constants';
import { Action } from 'material-flux';
import { md5Hex } from '../../common/Utils';

export default class ConfigAction extends Action {

  save(server, user, password) {
    const md5 = md5Hex(password);
    this.dispatch(ConfigConstants.SAVE_CONFIG, server, user, md5.digest, md5.salt);
  }

}