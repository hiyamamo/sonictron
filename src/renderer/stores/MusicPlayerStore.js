import { Store } from 'material-flux';
import { MusicPlayerConstants } from '../constants/Constants';

export default class MusicPlayerStore extends Store {
  constructor(context) {
    super(context);

    this._audioContext = new window.AudioContext();
    this._audio = null;
    this._sourceNode = null;

    this.state = {
      song: {
        id: null,
        name: '',
        url: '',
        artist: '',
        album: '',
      },
    };
    this.register(MusicPlayerConstants.PLAY_SONG, this.play);
    this.register(MusicPlayerConstants.STOP, this.stop);
  }

  play(song) {
    this._audio = new Audio(song.url);
    this._sourceNode = this._audioContext.createMediaElementSource(this._audio);
    this._sourceNode.connect(this._audioContext.destination);
    this._audio.play();
  }

  stop() {
    this._audio = null;
    this._sourceNode = null;
  }
}
