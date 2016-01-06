import Component from './Component';
import ArtistList from './ArtistList';
import Folders from './Folders';
import Playlists from './Playlists';
import SidebarButtonGroup from './SidebarButtonGroup';
import React from 'react';

export default class Sidebar extends Component {

  constructor(...args) {
    super(...args);
    this.actions = this.context.actions;
    this.stores = this.context.stores;
    const folders = this.stores.foldersStore.getFolders();
    this.state = {
      artists: this.stores.artistListStore.getArtists(),
      folders: folders,
      playlists: this.stores.playlistsStore.getPlaylists(),
      selectedFolder: 'all',
    };
  }

  componentWillMount() {
    this._loadSidebar();
  }

  componentDidMount() {
    this.stores.artistListStore.onChange(this._onLoadArtists.bind(this));
    this.stores.foldersStore.onChange(this._onLoadFolders.bind(this));
    this.stores.playlistsStore.onChange(this._onLoadPlaylists.bind(this));
  }

  componentWillUnMount() {
    this.stores.artistListStore.removeAllChangeListeners();
    this.stores.foldersStore.removeAllChangeListeners();
    this.stores.playlistsStore.removeAllChangeListeners();
  }

  _onLoadArtists() {
    this.setState({
      artists: this.stores.artistListStore.getArtists(),
    });
  }

  _onLoadFolders() {
    this.setState({
      folders: this.stores.foldersStore.getFolders(),
    });
  }

  _onLoadPlaylists() {
    this.setState({
      playlists: this.stores.playlistsStore.getPlaylists(),
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
    this._loadArtistPage(key, name);
  }

  render() {
    return (
      <div className='sidebar'>
        <SidebarButtonGroup handleReload={this._handleReload.bind(this)}/>
        <Folders items={this.state.folders} selected={this.state.selectedFolder} onChangeSelect={this._handleChangeFolder.bind(this)} />
        <Playlists playlists={this.state.playlists} />
        <ArtistList items={this.state.artists} onClick={this._handleArtistClick.bind(this)} />
      </div>
    );
  }

  _loadSidebar() {
    this._loadArtists('all');
    this.actions.foldersAction.load();
    this.actions.playlistsAction.load();
  }

  _loadArtists(folderId) {
    this.actions.artistListAction.load(folderId);
  }

  _loadArtistPage(artistId, artistName) {
    this.actions.artistListAction.loadArtistPage(artistId, artistName);
  }

  _handleReload(ev) {
    ev.preventDefault();
    this._loadSidebar();
  }
}
