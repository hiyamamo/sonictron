'use strict';

import { ConfigConstants, QueueConstants, MainConstants, SidebarConstants } from '../constants/Constants';
import { Action } from 'material-flux';
import { md5Hex } from '../../common/Utils';

export default class ConfigAction extends Action {

  save(settings) {
    const md5 = md5Hex(settings.password);
    if (settings.server !== localStorage.server ||
        settings.user !== localStorage.user ||
        settings.password !== localStorage.password) {

          this.dispatch(QueueConstants.STOP); 
          this.dispatch(QueueConstants.CLEAR_ALL);
          this.dispatch(MainConstants.CLEAR);
          this.dispatch(SidebarConstants.CLEAR);
        }

    settings.md5Digest = md5.digest;
    settings.salt = md5.salt
    this.dispatch(ConfigConstants.SAVE_CONFIG, settings);
  }

}
