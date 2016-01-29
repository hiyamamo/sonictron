import { Action } from 'material-flux';
import IPCKeys from '../../common/IPCKeys';
import { QueueConstants, } from '../constants/Constants';

export default class QueueAction extends Action {

  clearAllQueue() {
    this.dispatch(QueueConstants.CLEAR_ALL);
    this.dispatch(QueueConstants.STOP);
  }

  remove(index) {
    this.dispatch(QueueConstants.REMOVE, index);
  }

  play(song, idx) {
    this.dispatch(QueueConstants.PLAY_SONG, song);
    this.dispatch(QueueConstants.SET_NOW_INDEX, idx);
  }

  next() {
    this.dispatch(QueueConstants.NEXT_SONG);
  }

  prev() {
    this.dispatch(QueueConstants.PREV_SONG);
  }

  shuffle() {
    this.dispatch(QueueConstants.SHUFFLE);
  }
}
