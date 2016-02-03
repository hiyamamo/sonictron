'use strict';
import IPCKeys from '../../common/IPCKeys';
import http from 'http';
import url from 'url';
import { buildURL } from '../../common/Utils';

const APIMethods = {
  GetArtists: 'getIndexes',
  GetPlaylists: 'getPlaylists',
  GetPlaylist: 'getPlaylist',
  GetFolders: 'getMusicFolders',
  GetDirectry: 'getMusicDirectory',
  GetCoverArt: 'getCoverArt',
};
export default {
  listen(ipc){
    ipc.on(IPCKeys.RequestGetArtists, this._getArtists.bind(this));
    ipc.on(IPCKeys.RequestGetPlaylists, this._getPlaylists.bind(this));
    ipc.on(IPCKeys.RequestGetPlaylist, this._getPlaylist.bind(this));
    ipc.on(IPCKeys.RequestGetFolders, this._getFolders.bind(this));
    ipc.on(IPCKeys.RequestGetAlbums, this._getAlbums.bind(this));
    ipc.on(IPCKeys.RequestGetCoverArtURL, this._getCoverArtURL.bind(this));
    ipc.on(IPCKeys.RequestGetSongs, this._getSongs.bind(this));
  },

  _getArtists(event, folderId) {
    let params = {};
    if (folderId !== 'all') {
      params.musicFolderId = folderId;
    }
    const request = this._subsonicRequest(APIMethods.GetArtists, params);

    request.then((res) => {
      event.sender.send(IPCKeys.FinishGetArtists, res);
    }).catch((err) => {
      event.sender.send(IPCKeys.SendErrorMessage, err);
    });
  },

  _getPlaylists(event) {
    const request = this._subsonicRequest(APIMethods.GetPlaylists);

    request.then((res) => {
      event.sender.send(IPCKeys.FinishGetPlaylists, res);
    }).catch((err) => {
      event.sender.send(IPCKeys.SendErrorMessage, err);
    });
  },
  
  _getPlaylist(event, id) {
    let params = {
      id: id,
    };
    const request = this._subsonicRequest(APIMethods.GetPlaylist, params);

    request.then((res) => {
      event.sender.send(IPCKeys.FinishGetPlaylist, res);
    }).catch((err) => {
      event.sender.send(IPCKeys.SendErrorMessage, err);
    });
  },

  _getFolders(event) {
    const request = this._subsonicRequest(APIMethods.GetFolders);

    request.then((res) => {
      event.sender.send(IPCKeys.FinishGetFolders, res);
    }).catch((err) => {
      event.sender.send(IPCKeys.SendErrorMessage, err);
    });
  },

  _getAlbums(event, artistId) {
    let params = {
      id: artistId,
    };
    const request = this._subsonicRequest(APIMethods.GetDirectry, params);

    request.then((res) => {
      event.sender.send(IPCKeys.FinishGetAlbums, res);
    }).catch((err) => {
      event.sender.send(IPCKeys.SendErrorMessage, err);
    });
  },

  _getSongs(event, id) {
    let params = {
      id: id,
    };
    const request = this._subsonicRequest(APIMethods.GetDirectry, params);

    request.then((res) => {
      event.sender.send(IPCKeys.FinishGetSongs, res);
    }).catch((err) => {
      event.sender.send(IPCKeys.SendErrorMessage, err);
    });
  },

  _getCoverArtURL(event, id) {
    let params = {
      id: id,
    };

    const settings = {
      server: this._server,
      user: this._user,
      md5Digest: this._md5Digest,
      salt: this._salt,
    };

    const url = buildURL(APIMethods.GetCoverArt, params, settings);
    event.sender.send(IPCKeys.FinishGetCoverArtURL, url);
  },



  onSaveServerConfig(event, settings) {
    this._server = settings.server;
    this._user = settings.user;
    this._md5Digest = settings.md5Digest;
    this._salt = settings.salt;
  },


  _subsonicRequest(method, params) {

    const settings = {
      server: this._server,
      user: this._user,
      md5Digest: this._md5Digest,
      salt: this._salt,
    };
    const url = buildURL(method, params, settings);
    let exception = { reason : 'Error when connect subsonic server' };

    let httpPromise = new Promise((resolve, reject) => {
      let req = http.request(url, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          let data;
          try {
            data = JSON.parse(body);
          } catch(e) {
            data = "";
          }
          let subsonicResponse = (data['subsonic-response'] !== undefined) ? data['subsonic-response'] : { status: 'failed' };
          if (subsonicResponse.status == 'ok') {
            resolve(subsonicResponse);
          } else {
            if ( subsonicResponse.status === 'failed' && subsonicResponse.error !== undefined) {
              exception.subsonicError = subsonicResponse.error;
              exception.version = subsonicResponse.version;
            }
            reject(exception);
          }
        });
      });

      req.on('error', (er) => {
        console.log(er);
        exception.er = er;
        reject(exception);
      })

      req.end();
    });

    return httpPromise;
  },
}
