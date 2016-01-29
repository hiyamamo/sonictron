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

export const QueueConstants = keymirror({
  ADD_LAST: null,
  ADD_NEXT: null,
  CLEAR_ALL: null,
  REMOVE: null,
  SET_NOW_INDEX: null,
  SHUFFLE: null,
  NEXT_SONG: null,
  PREV_SONG: null,
  SHUFFLE: null,
  PLAY_SONG: null,
  STOP: null,
  PAUSE: null,
  RESUME: null,
});

export const ConfigConstants = keymirror({
  SAVE_CONFIG: null,
});

