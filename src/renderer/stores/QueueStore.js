import { Store } from 'material-flux';
import { QueueConstants } from '../constants/Constants';

export default class QueueStore extends Store {
  constructor(context) {
    super(context);

    this.state = {
      queue: [],
      nowIndex: 0,
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

    this._audioContext = new window.AudioContext();
    this._audio = null;
    this._sourceNode = null;

    this.register(QueueConstants.PLAY_SONG, this._play);
    this.register(QueueConstants.STOP, this._stop);
    this.register(QueueConstants.PAUSE, this._pause);
    this.register(QueueConstants.RESUME, this._resume);
    this.register(QueueConstants.ADD_LAST, this._addLast);
    this.register(QueueConstants.ADD_NEXT, this._addNext);
    this.register(QueueConstants.CLEAR_ALL, this._clearAll);
    this.register(QueueConstants.REMOVE, this._remove);
    this.register(QueueConstants.SET_NOW_INDEX, this._setNowIndex);
    this.register(QueueConstants.NEXT_SONG, this._putForward);
    this.register(QueueConstants.PREV_SONG, this._putBackward);
    this.register(QueueConstants.SHUFFLE, this._shuffle);
  }

  playing() {
    return this.state.playing;
  }

  currentTime() {
    return this.state.time;
  }

  getQueue() {
    return this.state.queue;
  }

  getNowPlaying() {
    return this.state.queue[this.state.nowIndex];
  }

  getNextSong() {
    let nIdx = this.state.nowIndex + 1;

    if (nIdx >= this.state.queue.length) {
      nIdx = 0;
    }
    return this.state.queue[nIdx];
  }

  getPrevSong() {
    let pIdx = this.state.nowIndex - 1;
    if (pIdx < 0) {
      pIdx = this.state.queue.length - 1;
    }

    return this.state.queue[pIdx];
  }

  _play(song) {
    if (this.state.playing) {
      this._audio.pause();
    }
    this._audio = new Audio(song.url);

    this._audio.addEventListener('timeupdate', this._onUpdateTime.bind(this));
    this._audio.addEventListener('ended', this._putForward.bind(this));

    this._sourceNode = this._audioContext.createMediaElementSource(this._audio);
    this._sourceNode.connect(this._audioContext.destination);
    this._audio.play();
    this.setState({
      song: song,
      playing: true,
    });
  }

  _onUpdateTime() {
    this.setState({
      time: this._audio.currentTime,
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
  _setNowIndex(index) {
    this.setState({
      nowIndex: index,
    });
  }

  _putForward() {
    let idx = 0;
    if (this.state.nowIndex < this.state.queue.length - 1){
      idx = this.state.nowIndex + 1;
    }
    this.setState({
      nowIndex: idx,
    });
    if (this.state.playing) {
      this._play(this.state.queue[idx]);
    }
  }

  _putBackward() {
    let idx = 0;
    if (this.state.nowIndex > 0){
      idx = this.state.nowIndex - 1;
    } else {
      idx = this.state.queue.length - 1;
    }

    this.setState({
      nowIndex: idx,
    });

    if (this.state.playing) {
      this._play(this.state.queue[idx]);
    }
  }

  _addLast(songs) {
    let q = this.state.queue;
    if (songs instanceof Array) {
      Array.prototype.push.apply(q, songs);
    } else {
      q.push(songs);
    }
    this.setState({
      queue: q,
    });
  }

  _addNext(songs) {
    let args = [ this.state.nowIndex + 1, 0 ];
    let q = this.state.queue;
    if (songs instanceof Array) {
      Array.prototype.push.apply(args, songs);
      Array.prototype.splice.apply(q, args);
    } else{
      q.splice(this.state.nowIndex + 1, 0, songs);
    }

    this.setState({
      queue: q,
    });
    
  }

  _remove(idx) {
    let q = this.state.queue;
    q.splice(idx, 1);
    this.setState({
      queue: q,
    });
  }

  _clearAll() {
    this.setState({
      queue: [],
    });
  }

  _shuffle() {
    let q = this.state.queue;
    const n = q.length;

    for (let i = (n-1); i >= 0; i--) {
      const r = Math.floor(Math.random() * (i+1));
      const tmp = q[i];
      q[i] = q[r];
      q[r] = tmp;
      if ( i === this.state.nowIndex) {
        this.setState({
          nowIndex: r
        });
      }
    }

    this.setState({
      queue: q
    });
  }
}
