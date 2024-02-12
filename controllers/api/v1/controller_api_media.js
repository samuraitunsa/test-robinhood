'use strict';

const _ = require('lodash');

const ApiV1Media = {
  MediaPost: async (req, res, next) => {
    console.log('# Controller ApiV1Media.MediaPost');
    try {
      let media = await global.Service.Media.SetMedia(req, res);
      return res.success(media, 200, 'success');
    } catch (err) {
      console.error('# Error Controller ApiV1Media.MediaPost:', err);
      return res.errorDevice(err);
    }
  },
};

module.exports = ApiV1Media;
