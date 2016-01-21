import { Action } from 'material-flux';
import IPCKeys from '../../common/IPCKeys';
import { QueueConstants, MusicPlayerConstants } from '../constants/Constants';

export default class QueueAction extends Action {

  clearAllQueue() {
    this.dispatch(QueueConstants.CLEAR_ALL);
  }

  remove(index) {
    this.dispatch(QueueConstants.REMOVE, index);
  }

  play(song, idx) {
    this.dispatch(MusicPlayerConstants.PLAY_SONG, song);
    this.dispatch(QueueConstants.SET_NOW_INDEX, idx);
  }
}
