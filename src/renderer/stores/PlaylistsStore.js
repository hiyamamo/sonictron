import { PlaylistsConstants } from '../constants/Constants';
import { Store } from 'material-flux';

const LOAD_EVENT = 'load';

export default class ArtistListStore extends Store {
  constructor(context) {
    super(context);

    this.state = {
      playlists: null,
    };

    this.register(PlaylistsConstants.LOAD_PLAYLISTS, this._load);
  }

  getPlaylists() {
    return this.state.playlists;
  }


  _load(playlists) {
    this.setState({
      playlists: playlists,
    });
  }

}

