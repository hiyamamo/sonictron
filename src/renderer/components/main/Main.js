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
      mode: 'none',
      title: '',
      albums: [],
      songs: [],
      coverArt: '',
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

  _handleAddSong2Next(ev, id) {
    ev.preventDefault();
    console.log('add next: ', id);
  }

  _handleAddSong2Last(ev, id) {
    ev.preventDefault();
    console.log('add last: ', id);
  }

  _handleAddSong2Fav(ev, id) {
    ev.preventDefault();
    console.log('add fav: ', id);
  }

  _handlePlaySong(ev, id) {
    ev.preventDefault();
    console.log('play: ', id);
  }


  render() {
    const songHandlers = {
      addLast: this._handleAddSong2Last.bind(this),
      addNext: this._handleAddSong2Next.bind(this),
      addFav: this._handleAddSong2Fav.bind(this),
      play: this._handlePlaySong.bind(this),
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
