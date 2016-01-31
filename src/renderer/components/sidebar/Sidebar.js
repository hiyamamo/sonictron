import Component from '../Component';
import ArtistList from './ArtistList';
import Folders from './Folders';
import Playlists from './Playlists';
import React from 'react';
import Button from '../common/Button';

export default class Sidebar extends Component {

  constructor(...args) {
    super(...args);
    this.actions = this.context.actions;
    this.stores = this.context.stores;
    const folders = this.stores.sidebarStore.getFolders();
    this.state = {
      artists: this.stores.sidebarStore.getArtists(),
      folders: folders,
      playlists: this.stores.sidebarStore.getPlaylists(),
      selectedFolder: 'all',
    };
  }

  componentWillMount() {
    this._loadSidebar();
  }

  componentDidMount() {
    this.stores.sidebarStore.onChange(this._onChange.bind(this));
  }

  componentWillUnmount () {
    this.stores.sidebarStore.removeAllChangeListeners();
  }

  _onChange() {
    const store = this.stores.sidebarStore;

    this.setState({
      artists: store.getArtists(),
      folders: store.getFolders(),
      playlists: store.getPlaylists(),
    });
  }

  _handleChangeFolder(ev) {
    this.setState({
      selectedFolder: ev.target.value,
    });
    this._loadArtists(ev.target.value);
  }

  _handleArtistClick(ev, key, name) {
    ev.preventDefault();
    this._loadAlbums(key, name);
  }

  _handlePlaylistClick(ev, key, name) {
    ev.preventDefault();
    this.actions.sidebarAction.loadSongsInPlaylist(key, name);
  }

  render() {
    return (
      <div className='sidebar'>
        <Button glyph='arrows-ccw' onClick={this._handleReload.bind(this)}/>
        <Folders items={this.state.folders} selected={this.state.selectedFolder} onChangeSelect={this._handleChangeFolder.bind(this)} />
        <Playlists playlists={this.state.playlists} onClick={this._handlePlaylistClick.bind(this)} />
        <ArtistList items={this.state.artists} onClick={this._handleArtistClick.bind(this)} />
      </div>
    );
  }

  _loadSidebar() {
    const action = this.actions.sidebarAction;
    this._loadArtists('all');
    action.loadFolders();
    action.loadPlaylists();
  }

  _loadArtists(folderId) {
    this.actions.sidebarAction.loadArtists(folderId);
  }

  _loadAlbums(artistId, artistName) {
    this.actions.sidebarAction.loadAlbums(artistId, artistName);
  }

  _handleReload(ev) {
    ev.preventDefault();
    this._loadSidebar();
  }
}
