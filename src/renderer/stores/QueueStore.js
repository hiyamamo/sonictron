import { Store } from 'material-flux';
import { QueueConstants } from '../constants/Constants';

export default class QueueStore extends Store {
  constructor(context) {
    super(context);

    this.state = {
      queue: [],
      nowIndex: 0,
    };

    this.register(QueueConstants.ADD_LAST, this._addLast);
    this.register(QueueConstants.ADD_NEXT, this._addNext);
    this.register(QueueConstants.CLEAR_ALL, this._clearAll);
    this.register(QueueConstants.REMOVE, this._remove);
    this.register(QueueConstants.SET_NOW_INDEX, this._setNowIndex);
    this.register(QueueConstants.NEXT_SONG, this._putForward);
    this.register(QueueConstants.PREV_SONG, this._putBackward);
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
}
