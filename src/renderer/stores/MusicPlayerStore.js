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
      playing: false,
      volume: 50,
    };
    this.register(MusicPlayerConstants.PLAY_SONG, this._play);
    this.register(MusicPlayerConstants.STOP, this._stop);
  }

  playing() {
    return this.state.playing;
  }

  _play(song) {
    this._audio = new Audio(song.url);
    this._sourceNode = this._audioContext.createMediaElementSource(this._audio);
    this._sourceNode.connect(this._audioContext.destination);
    this._audio.play();
    this.setState({
      song: song,
      playing: true,
    });
  }

  _stop() {
    this._audio.pause();
    this._audio = null;
    this._sourceNode = null;
    this.setState({
      playing: false,
    });
  }
}
