'use strict';

const ApiV1Index = {
  IndexGet: (req, res, next) => {
    console.log('# Controller ApiV1Index.IndexGet');
    try {
      return res.success({}, 200, 'success');
    } catch (err) {
      console.error('# Error Controller ApiV1Index.IndexGet:', err);
      return res.error(err);
    }
  },
};

module.exports = ApiV1Index;
