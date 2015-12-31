'use strict';
import IPCKeys from '../../common/IPCKeys';
import http from 'http';
import url from 'url';
import Promise from 'ypromise';

const APIMethods = {
  GetArtists: 'getIndexes',
  GetPlaylists: 'getPlaylists',
  GetFolders: 'getMusicFolders',
  GetArtist: 'getArtist',
};
export default {
  listen(ipc){
    ipc.on(IPCKeys.SaveServerConfig, this.onSaveServerConfig.bind(this));
    ipc.on(IPCKeys.RequestGetArtists, this._getArtists.bind(this));
    ipc.on(IPCKeys.RequestGetPlaylists, this._getPlaylists.bind(this));
    ipc.on(IPCKeys.RequestGetFolders, this._getFolders.bind(this));
    ipc.on(IPCKeys.RequestGetArtist, this._getArtist.bind(this));
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

  _getFolders(event) {
    const request = this._subsonicRequest(APIMethods.GetFolders);

    request.then((res) => {
      event.sender.send(IPCKeys.FinishGetFolders, res);
    }).catch((err) => {
      event.sender.send(IPCKeys.SendErrorMessage, err);
    });
  },

  _getArtist(event, artistId) {
    let params = {
      id: artistId,
    };
    const request = this._subsonicRequest(APIMethods.GetArtist, params);

    request.then((res) => {
      event.sender.send(IPCKeys.FinishGetArtist, res);
    }).catch((err) => {
      event.sender.send(IPCKeys.SendErrorMessage, err);
    });
  }



  onSaveServerConfig(event, localStorage) {
    this._server = localStorage.server;
    this._user = localStorage.user;
    this._md5Digest = localStorage.md5Digest;
    this._salt = localStorage.salt;
  },

  _buildURL(method, params) {
    const split = this._server.split(':');
    const options = {
      method: 'GET',
      protocol: 'http',
      headers: {
        'Content-Type': 'application/json; charset=utf8'
      },
      host: this._server,
      pathname: '/rest/' + method + '.view',
      query: params,
    };

    return url.format(options);
  },

  _subsonicRequest(method, params) {
    params = params || {};

    Object.assign( params, {
      u: this._user,
      s: this._server,
      t: this._md5Digest,
      s: this._salt,
      c: 'Sonictron',
      v: '1.13.0',
      f: 'json',
    });
    const url = this._buildURL(method, params);
    let exception = { reason : 'Error when connect subsonic server' };

    let httpPromise = new Promise((resolve, reject) => {
      let req = http.request(url, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          const data = JSON.parse(body);
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
