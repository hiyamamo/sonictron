import { ArtistPageConstants } from '../constants/Constants';
import { Store } from 'material-flux';

export default class ArtistPageStore extends Store {
  constructor(context) {
    super(context);

    this.state = {
      name: "",
      albums: [],
    };

    this.register(ArtistPageConstants.LOAD_ALBUMS, this._load);
    this.register(ArtistPageConstants.LOAD_ARTIST_NAME, this._loadName);
  }

  getAlbums() {
    return this.state.albums;
  }

  getArtistName() {
    return this.state.name;
  }

  _load(albums) {
    this.setState({
      albums: albums,
    });
  }

  _loadName(name) {
    this.setState({
      name: name,
    });
  }
}
