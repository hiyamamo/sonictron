import { ArtistListConstants } from '../constants/Constants';
import { Store } from 'material-flux';

const LOAD_EVENT = 'load';

export default class ArtistListStore extends Store {
  constructor(context) {
    super(context);

    this.state = {
      artists: null,
    };

    this.register(ArtistListConstants.LOAD_ARTISTS, this._load);
  }

  getArtists() {
    return this.state.artists;
  }


  _load(artists) {
    this.setState({
      artists: artists,
    });
  }

}

