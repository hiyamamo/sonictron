import Component from '../Component';
import React from 'react';
import ArtistPage from './ArtistPage';

export default class Main extends Component {
  constructor(...args) {
    super(...args);
    this.actions = this.context.actions;
    this.stores = this.context.stores;

    this.state = {
      mode: 'artist',
      name: '',
      albums: [],
    };
  }

  componentDidMount() {
    this.stores.artistPageStore.onChange(this._onLoadArtistPage.bind(this));
  }

  componentWillUnMount() {
    this.stores.artistPageStore.removeAllChangeListeners();
  }

  _onLoadArtistPage() {
    const store = this.stores.artistPageStore;
    const name = store.getArtistName();
    const albums = store.getAlbums();
    this.setState({
      name: name,
      albums: albums,
    });
  }


  _handleClickAlbum(ev, id) {
    console.log(id);
    console.log(this);

  }


  render() {
    return (
      <div className='main' >
        <ArtistPage name={this.state.name} albums={this.state.albums} onClick={this._handleClickAlbum.bind(this)} />
      </div>
    );
  }
}
