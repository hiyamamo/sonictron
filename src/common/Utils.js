'use strict';

import crypto from 'crypto';

export function md5Hex(src) {
  const md5 = crypto.createHash('md5');
  const salt = Math.random().toString(36).slice(-8);
  md5.update(src+salt, 'utf8');
  return {
    digest: md5.digest('hex'),
    salt: salt,
  };
}
