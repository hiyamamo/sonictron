import Component from '../Component';
import React from 'react';
import AlbumList from './AlbumList';
import SongList from './SongList';

export default class Main extends Component {
  constructor(...args) {
    super(...args);
    this.actions = this.context.actions;
    this.stores = this.context.stores;

    this.state = {
      mode: this.stores.mainStore.getMode(),
      name: '',
      albums: [],
      songs: [],
    };
  }

  componentDidMount() {
    this.stores.mainStore.onChange(this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.stores.artistPageStore.removeAllChangeListeners();
  }

  _onChange() {
    const store = this.stores.mainStore;

    this.setState({
      name: store.getArtistName(),
      albums: store.getAlbums(),
      songs: store.getSongs(),
      mode: store.getMode(),
    });

  }


  _handleClickAlbum(ev, id) {
    this.actions.mainAction.changeMode('song');
    this.actions.mainAction.loadSongs(id);
  }

  _handleClickSong(ev, id) {
    console.log(id);
  }


  render() {
    let albumList = <AlbumList albums={this.state.albums} onClick={this._handleClickAlbum.bind(this)} />;
    let songList = <SongList songs={this.state.songs} onClick={this._handleClickSong.bind(this)} />;

    let content = this.state.mode === 'album' ? albumList : songList;
    return (
      <div className='main' >
        {content}
      </div>
    );
  }
}
