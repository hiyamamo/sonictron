import { MainConstants } from '../constants/Constants';
import { Store } from 'material-flux';

export default class MainStore extends Store {
  constructor(context) {
    super(context);

    this.state = {
      name: "",
      albums: [],
      songs: [],
    };

    this.register(MainConstants.LOAD_ALBUMS, this._loadAlbums);
    this.register(MainConstants.LOAD_ARTIST_NAME, this._loadName);
    this.register(MainConstants.LOAD_SONGS, this._loadSongs);
    this.register(MainConstants.CHANGE_MODE, this._onChangeMode);
  }

  getAlbums() {
    return this.state.albums;
  }

  getSongs() {
    return this.state.songs;
  }

  getArtistName() {
    return this.state.name;
  }

  getMode() {
    return this.state.mode;
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

  _loadName(name) {
    this.setState({
      name: name,
    });
  }

  _onChangeMode(mode) {
    this.setState({
      mode: mode,
    });
  }
}
