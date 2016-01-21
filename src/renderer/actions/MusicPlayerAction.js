import { Action } from 'material-flux';
import IPCKeys from '../../common/IPCKeys';
import { MusicPlayerConstants } from '../constants/Constants';

export default class MusicPlayerAction extends Action {
  constructor(context) {
    super(context);
    this._audio = null;
  }

  resume() {
  }

  pause() {
  }

  stop() {
    this.dispatch(MusicPlayerConstants.STOP);
  }

  next() {
  }

  prev() {
  }

}
