import { SidebarConstants } from '../constants/Constants';
import { Store } from 'material-flux';
export default class SidebarStore extends Store {
  constructor(context) {
    super(context);
    this.state = {
      artists: null,
      folders: null,
      playlists: null,
    };
    this.register(SidebarConstants.LOAD_ARTISTS, this._onLoadArtists);
    this.register(SidebarConstants.LOAD_FOLDERS, this._onLoadFolders);
    this.register(SidebarConstants.LOAD_PLAYLISTS, this._onLoadPlaylists);
    this.register(SidebarConstants.CLEAR, this._initState);
  }

  _initState() {
    this.setState({
      artists: null,
      folders: null,
      playlists: null,
    });
  }

  getArtists() {
    return this.state.artists;
  }

  getFolders() {
    return this.state.folders;
  }

  getPlaylists() {
    return this.state.playlists;
  }

  _onLoadArtists(artists) {
    this.setState({
      artists: artists,
    });
  }

  _onLoadFolders(folders) {
    this.setState({
      folders: folders,
    });
  }

  _onLoadPlaylists(playlists) {
    this.setState({
      playlists: playlists,
    });
  }

}
