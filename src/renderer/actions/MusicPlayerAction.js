import { Action } from 'material-flux';
import IPCKeys from '../../common/IPCKeys';
import { QueueConstants } from '../constants/Constants';

export default class MusicPlayerAction extends Action {
  constructor(context) {
    super(context);
    this._audio = null;
  }

  play(song) {
    this.dispatch(QueueConstants.PLAY_SONG, song);
  }

  resume() {
    this.dispatch(QueueConstants.RESUME);
  }

  pause() {
    this.dispatch(QueueConstants.PAUSE);
  }

  stop() {
    this.dispatch(QueueConstants.STOP);
  }

}
