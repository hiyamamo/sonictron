import { MainConstants } from '../constants/Constants';
import { Store } from 'material-flux';

export default class MainStore extends Store {
  constructor(context) {
    super(context);

    this.state = {
      title: "",
      albums: [],
      songs: [],
      coverArt: "",
    };

    this.register(MainConstants.LOAD_ALBUMS, this._loadAlbums);
    this.register(MainConstants.SET_TITLE, this._setTitle);
    this.register(MainConstants.LOAD_SONGS, this._loadSongs);
    this.register(MainConstants.CHANGE_MODE, this._onChangeMode);
    this.register(MainConstants.SET_COVERART, this._setCoverArt);
  }

  getAlbums() {
    return this.state.albums;
  }

  getSongs() {
    return this.state.songs;
  }

  getTitle() {
    return this.state.title;
  }

  getMode() {
    return this.state.mode;
  }

  getCoverArt() {
    return this.state.coverArt;
  }

  _loadAlbums(albums) {
    this.setState({
      albums: albums,
    });
  }

  _loadSongs(songs) {
    this.setState({
      songs: songs,
    });
  }

  _setTitle(title) {
    this.setState({
      title: title,
    });
  }

  _onChangeMode(mode) {
    this.setState({
      mode: mode,
    });
  }

  _setCoverArt(coverArt) {
    this.setState({
      coverArt: coverArt,
    });
  }
}
