import keymirror from 'keymirror';

export const ArtistListConstants = keymirror({
  LOAD_ARTISTS: null,
});

export const MainConstants = keymirror({
  LOAD_ALBUMS: null,
  LOAD_ARTIST_NAME: null,
  LOAD_ARTIST_INFO: null,
  LOAD_SONGS: null,
  CHANGE_MODE: null,
});

export const FoldersConstants = keymirror({
  LOAD_FOLDERS: null,
});

export const PlaylistsConstants = keymirror({
  LOAD_PLAYLISTS: null,
});

export const ConfigConstants = keymirror({
  SAVE_CONFIG: null,
});


export const MusicPlayerConstants = keymirror({
  PLAY_SONG: null,
  STOP: null,
});
