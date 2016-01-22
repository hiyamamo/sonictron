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
      time: 0,
      volume: 50,
    };
    this.register(MusicPlayerConstants.PLAY_SONG, this._play);
    this.register(MusicPlayerConstants.STOP, this._stop);
    this.register(MusicPlayerConstants.PAUSE, this._pause);
    this.register(MusicPlayerConstants.RESUME, this._resume);
  }

  playing() {
    return this.state.playing;
  }

  currentTime() {
    return this.state.time;
  }

  _play(song) {
    if (this.state.playing) {
      this._audio.pause();
    }
    this._audio = new Audio(song.url);
    this._audio.addEventListener('timeupdate', () => {
      this.setState({
        time: this._audio.currentTime,
      });
    });
    this._sourceNode = this._audioContext.createMediaElementSource(this._audio);
    this._sourceNode.connect(this._audioContext.destination);
    this._audio.play();
    this.setState({
      song: song,
      playing: true,
    });
  }

  _pause() {
    this._audio.pause();
    this.setState({
      playing: false,
    });
  }

  _resume() {
    this._audio.play();
    this.setState({
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
