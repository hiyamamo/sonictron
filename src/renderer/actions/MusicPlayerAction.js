import { Action } from 'material-flux';
import IPCKeys from '../../common/IPCKeys';
import { MusicPlayerConstants } from '../constants/Constants';

export default class MusicPlayerAction extends Action {
  constructor(context) {
    super(context);
    this._audio = null;
  }

  play(song) {
    this.dispatch(MusicPlayerConstants.PLAY_SONG, song);
  }

  resume() {
    this.dispatch(MusicPlayerConstants.RESUME);
  }

  pause() {
    this.dispatch(MusicPlayerConstants.PAUSE);
  }

  stop() {
    this.dispatch(MusicPlayerConstants.STOP);
  }

  next() {
  }

  prev() {
  }

}
