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
      title: this.stores.mainStore.getTitle(),
      albums: this.stores.mainStore.getAlbums(),
      songs: this.stores.mainStore.getSongs(),
      mode: this.stores.mainStore.getMode(),
      coverArt: this.stores.mainStore.getCoverArt(),
    };
  }

  componentDidMount() {
    this.stores.mainStore.onChange(this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.stores.mainStore.removeAllChangeListeners();
  }

  _onChange() {
    const store = this.stores.mainStore;

    this.setState({
      title: store.getTitle(),
      albums: store.getAlbums(),
      songs: store.getSongs(),
      mode: store.getMode(),
      coverArt: store.getCoverArt(),
    });

  }


  _handleClickAlbum(ev, id, art, albumName) {
    this.actions.mainAction.changeMode('song');
    this.actions.mainAction.loadSongs(id, art);
    this.actions.mainAction.changeTitle(albumName);
  }

  _handleAddSong2Next(ev, song) {
    ev.preventDefault();
    this.actions.mainAction.addNext2Q(song);
  }

  _handleAddSong2Last(ev, song) {
    ev.preventDefault();
    this.actions.mainAction.addLast2Q(song);
  }

  _handleAddSong2Fav(ev, song) {
    ev.preventDefault();
    console.log('add fav: ', song);
  }

  _handlePlaySong(ev, song) {
    ev.preventDefault();
    this.actions.mainAction.playSong(song);
  }

  _handleAddAllSongs2Q(ev) {
    ev.preventDefault();
    this.actions.mainAction.addLast2Q(this.stores.mainStore.getSongs());
  }

  _handlePlayAllSongs(ev) {
    ev.preventDefault();
    this.actions.mainAction.playAllSongs(this.state.songs);
  }

  _handlePlayRandom(ev) {
    ev.preventDefault();
    this.actions.mainAction.playRandom(this.state.songs);
  }


  render() {
    const songHandlers = {
      addLast: this._handleAddSong2Last.bind(this),
      addNext: this._handleAddSong2Next.bind(this),
      addFav: this._handleAddSong2Fav.bind(this),
      play: this._handlePlaySong.bind(this),
      addAll: this._handleAddAllSongs2Q.bind(this),
      playAll: this._handlePlayAllSongs.bind(this),
      playRandom: this._handlePlayRandom.bind(this),
    };
    let albumList = <AlbumList albums={this.state.albums} onClick={this._handleClickAlbum.bind(this)} />;
    let songList = <SongList coverArt={this.state.coverArt} songs={this.state.songs} handlers={songHandlers} />;

    let content;
    switch(this.state.mode) {
      case 'album':
        content = albumList;
        break;
      case 'song':
        content = songList;
        break;
      case 'none':
      default:
        content = null;
        break;
    }
    return (
      <div className='main' >
        <h3>{this.state.title}</h3>
        {content}
      </div>
    );
  }
}
