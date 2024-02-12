'use strict';

const _ = require('lodash');
const crypto = require('crypto')

const utils = {
    hashPassword : password  => {
        return crypto.createHash('sha256').update(password).digest('hex')
    },
}

module.exports = utils;