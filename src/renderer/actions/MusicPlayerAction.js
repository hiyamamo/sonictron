import { Action } from 'material-flux';
import IPCKeys from '../../common/IPCKeys';
import { MusicPlayerConstants } from '../constants/Constants';

export default class MusicPlayerAction extends Action {
  constructor(context) {
    super(context);
    this._audio = null;
  }

  play(song) {
    song.url = 'http://192.168.100.11:4040/rest/stream.view?u='
    + localStorage.user + '&t=' + localStorage.md5Digest + '&s=' + localStorage.salt
    + '&v=1.13.0&c=Sonictron&id=12340';
    console.log(song.url);
    this.dispatch(MusicPlayerConstants.PLAY_SONG, song);
  }

  resume() {
  }

  pause() {
  }

  stop() {
    this.dispatch(Constants.STOP);
  }

  next() {
  }

  prev() {
  }

}
