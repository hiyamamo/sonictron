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
