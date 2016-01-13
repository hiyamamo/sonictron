import keymirror from 'keymirror';

export const SidebarConstants = keymirror({
  LOAD_ARTISTS: null,
  LOAD_FOLDERS: null,
  LOAD_PLAYLISTS: null,
});

export const MainConstants = keymirror({
  LOAD_ALBUMS: null,
  SET_TITLE: null,
  LOAD_ARTIST_INFO: null,
  LOAD_SONGS: null,
  CHANGE_MODE: null,
  SET_COVERART: null,
});

export const ConfigConstants = keymirror({
  SAVE_CONFIG: null,
});


export const MusicPlayerConstants = keymirror({
  PLAY_SONG: null,
  STOP: null,
});
