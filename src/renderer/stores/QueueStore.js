import { Store } from 'material-flux';
import IPCKeys from '../../common/IPCKeys';
import { QueueConstants } from '../constants/Constants';

export default class QueueStore extends Store {
  constructor(context) {
    super(context);
    this._ipc = context.ipc;

    this._initState();

    this._audioContext = new window.AudioContext();
    this._audio = null;
    this._sourceNode = null;
    this._gainNode = null;

    this._ipc.on(IPCKeys.RequestPlay, this._resume.bind(this));
    this._ipc.on(IPCKeys.RequestPause, this._pause.bind(this));
    this._ipc.on(IPCKeys.RequestPrev, this._putBackward.bind(this));
    this._ipc.on(IPCKeys.RequestNext, this._putForward.bind(this));
    this._ipc.on(IPCKeys.RequestIncreseVolume, this._increaseVolume.bind(this));
    this._ipc.on(IPCKeys.RequestDecreaseVolume, this._decreaseVolume.bind(this));

    this.register(QueueConstants.PLAY_SONG, this._play);
    this.register(QueueConstants.PLAY_FIRST, this._play1st);
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
    this.register(QueueConstants.CHANGE_VOLUME, this._changeVolume);
    this.register(QueueConstants.SEEK, this._seek);
    this.register(QueueConstants.TOGGLE_REPEAT, this._toggleRepeat);
  }

  _initState() {
    this.setState({
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
      volume: localStorage.volume || 50,
      repeat: localStorage.repeat || 'none',
    });
  }

  playing() {
    return this.state.playing;
  }

  currentTime() {
    return this.state.time;
  }

  repeat() {
    return this.state.repeat;
  }

  getQueue() {
    return this.state.queue;
  }

  getNowPlaying() {
    return this.state.song;
  }

  getNowIndex() {
    return this.state.nowIndex;
  }

  getVolume() {
    return this.state.volume;
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

  _load(song) {

    if (this._audio) {
      this._audio.src = '';
    }

    this._audio = new Audio(song.url);

    this._audio.addEventListener('timeupdate', this._onUpdateTime.bind(this));
    this._audio.addEventListener('ended', this._onEndSong.bind(this));

    this._sourceNode = this._audioContext.createMediaElementSource(this._audio);
    this._gainNode = this._audioContext.createGain();
    this._sourceNode.connect(this._gainNode);
    this._gainNode.connect(this._audioContext.destination);
    this._gainNode.gain.value = this.state.volume / 100;

    this.setState({
      song: song
    });
  }

  _play(song) {
    if (this.state.playing) {
      this._audio.pause();
      this._audio.src = '';
    }

    this._load(song);

    this._audio.play();

    this.setState({
      playing: true,
    });
    this._ipc.send(IPCKeys.Play);
  }

  _onEndSong() {
    if (this.state.repeat === 'single') {
      this._play(this.state.song);
    } else {
      this._putForward();
    }
  }

  _seek(val) {
    if (this._audio.buffered.end(0) >= val){
      this._audio.currentTime = val;
    }
  }

  _play1st() {
    this._play(this.state.queue[0]);
  }

  _changeVolume(val) {
    if (val >= 100) {
      val = 100;
    }
    if (val < 0){
      val = 0;
    }
    this.setState({
      volume: val
    });
    if (this._audio) {
      this._gainNode.gain.value = val / 100;
    }
    localStorage.volume = val;
  }

  _increaseVolume() {
    const vol = Number(this.state.volume) + 1;
    this._changeVolume(vol);
  }

  _decreaseVolume() {
    const vol = Number(this.state.volume) - 1;
    this._changeVolume(vol);
  }


  _onUpdateTime() {
    if (this._audio) {
      this.setState({
        time: this._audio.currentTime,
      });
    }
  }

  _pause() {
    this._audio.pause();
    this.setState({
      playing: false,
    });
    this._ipc.send(IPCKeys.Pause);
  }

  _resume() {
    this._audio.play();
    this.setState({
      playing: true,
    });
    this._ipc.send(IPCKeys.Play);
  }

  _stop() {
    if (this._audio) {
      this._audio.pause();
      this._audio.src = '';
      this._audio = null;
      this._sourceNode = null;
      this.setState({
        playing: false,
        song: {},
        time: 0,
      });
    }
    this._ipc.send(IPCKeys.Pause);
  }

  _setNowIndex(index) {
    this.setState({
      nowIndex: index,
    });
  }

  _put(idx) {
    if (!this.state.queue) {
      return;
    }
    const nextSong = this.state.queue[idx];

    this.setState({
      nowIndex: idx,
      time: 0,
    });

    if (this.state.playing) {
      this._play(nextSong);
    } else {
      this._load(nextSong);
    }
  }

  _putForward() {

    let idx = this.state.nowIndex + 1;

    if (idx >= this.state.queue.length) {
      if (this.state.repeat !== 'all') {
        this._stop();
        return;
      } else {
        idx = 0;
      }
    }

    this._put(idx);
  }

  _putBackward() {
    let idx = 0;

    if (this.state.nowIndex > 0){
      idx = this.state.nowIndex - 1;
    }

    if (this.state.time >= 5) {
      console.log(this.state.time);
      this._seek(0);
      return;
    }

    this._put(idx);
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

    if (idx === this.state.nowIndex) {
      this._stop();
    }
  }

  _clearAll() {
    this._initState();
  }

  _shuffle() {
    let q = this.state.queue;
    const n = q.length;
    const nowId = this.state.song.id;

    for (let i = (n-1); i >= 0; i--) {
      const r = Math.floor(Math.random() * (i+1));
      const tmp = q[i];
      q[i] = q[r];
      q[r] = tmp;
    }

    for (let i = 0; i < q.length; i++) {
      if (q[i].id === nowId) {
        this.setState({
          nowIndex: i,
        });
      }
    }

    this.setState({
      queue: q
    });
  }

  _toggleRepeat() {
    let repeat = 'none';

    if (this.state.repeat === 'none') {
      repeat = 'all';
    }

    if (this.state.repeat === 'all') {
      repeat = 'single';
    }

    this.setState({
      repeat: repeat
    });

    localStorage.repeat = repeat;
  }
}
