import { Action } from 'material-flux';
import { MainConstants, QueueConstants } from '../constants/Constants';
import IPCKeys from '../../common/IPCKeys';
import { getStreamURL } from '../Utils';

export default class MainAction extends Action {
  constructor(context) {
    super(context);
    this._ipc = context.ipc;
    this._ipc.on(IPCKeys.FinishGetAlbums, this._onFinishGetAlbums.bind(this));
    this._ipc.on(IPCKeys.FinishGetSongs, this._onFinishGetSongs.bind(this));
    this._ipc.on(IPCKeys.FinishGetPlaylist, this._onFinishGetPlaylist.bind(this));
  }

  _onFinishGetAlbums(event, response) {
    this.dispatch(MainConstants.LOAD_ALBUMS, response.directory.child);
  }

  _onFinishGetPlaylist(event, response) {
    this.dispatch(MainConstants.LOAD_SONGS, response.playlist.entry);
    this.dispatch(MainConstants.SET_COVERART, response.playlist.coverArt);
  }

  
  _onFinishGetSongs(event, response) {
    this.dispatch(MainConstants.LOAD_SONGS, response.directory.child);
  }

  loadSongs(id, coverArt) {
    this._ipc.send(IPCKeys.RequestGetSongs, id);
    this.dispatch(MainConstants.SET_COVERART, coverArt);
  }

  changeMode(mode) {
    this.dispatch(MainConstants.CHANGE_MODE, mode);
  }

  changeTitle(title) {
    this.dispatch(MainConstants.SET_TITLE, title);
  }

  addLast2Q(song) {
    this._attachStreamURL2SongObjects(song);
    this.dispatch(QueueConstants.ADD_LAST, song);
  }

  addNext2Q(song) {
    this.dispatch(QueueConstants.ADD_NEXT, song);
  }

  playSong(song) {
    this._attachStreamURL2SongObjects(song);
    this.dispatch(QueueConstants.STOP);
    this.dispatch(QueueConstants.CLEAR_ALL);
    this.dispatch(QueueConstants.ADD_LAST, song);
    this.dispatch(QueueConstants.PLAY_SONG, song);
  }

  playAllSongs(songs) {
    this._attachStreamURL2SongObjects(songs);
    this.dispatch(QueueConstants.STOP);
    this.dispatch(QueueConstants.CLEAR_ALL);
    this.dispatch(QueueConstants.ADD_LAST, songs);
    this.dispatch(QueueConstants.PLAY_FIRST);
  }

  playRandom(songs) {
    this._attachStreamURL2SongObjects(songs);
    this.dispatch(QueueConstants.STOP);
    this.dispatch(QueueConstants.CLEAR_ALL);
    this.dispatch(QueueConstants.ADD_LAST, songs);
    this.dispatch(QueueConstants.SHUFFLE);
    this.dispatch(QueueConstants.PLAY_FIRST);
  }

  _attachStreamURL2SongObjects(songs) {
    if (songs.length) {
      for (let i = 0; i < songs.length; ++i) {
        songs[i].url = getStreamURL(songs[i].id);
      }
    } else {
      songs.url = getStreamURL(songs.id);
    }
  }
}


