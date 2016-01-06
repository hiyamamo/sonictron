'use strict';

import crypto from 'crypto';
import url from 'url';

export function md5Hex(src) {
  const md5 = crypto.createHash('md5');
  const salt = Math.random().toString(36).slice(-8);
  md5.update(src+salt, 'utf8');
  return {
    digest: md5.digest('hex'),
    salt: salt,
  };
}

export function buildURL(method, params, settings) {
  params = _getHttpParams(params, settings);
  const options = {
    method: 'GET',
    protocol: 'http',
    headers: {
      'Content-Type': 'application/json; charset=utf8'
    },
    host: settings.server,
    pathname: '/rest/' + method + '.view',
    query: params,
  };

  return url.format(options);
};

function _getHttpParams(params, settings) {
  params = params || {};
  Object.assign( params, {
    u: settings.user,
    s: settings.server,
    t: settings.md5Digest,
    s: settings.salt,
    c: 'Sonictron',
    v: '1.13.0',
    f: 'json',
  });

  return params;
};

