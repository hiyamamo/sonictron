import { buildURL } from '../common/Utils'


const settings = {
  server: localStorage.server,
  user: localStorage.user,
  md5Digest: localStorage.md5Digest,
  salt: localStorage.salt,
};

export function getStreamURL(songId) {

  const params = {
    id: songId,
  };

  return buildURL('stream', params, settings);
}

export function getCoverArtURL(id) {
  const params = {
    id: id,
    size: 160,
  };

  return buildURL('getCoverArt', params, settings);
}

export function formatDuration(duration) {
  let min = Math.floor(duration / 60);
  let sec = duration % 60;

  min = ('0' + min).slice(-2);
  sec = ('0' + sec).slice(-2);

  return min + ':' + sec;
}
