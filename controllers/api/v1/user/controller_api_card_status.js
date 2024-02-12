'use strict';

const ApiV1CardStatus = {
  ListGet: async (req, res, next) => {
    console.log('# Controller ApiV1CardStatus.ListGet');
    try {
      let objGet = await global.Service.User.CardStatus.GetCardStatus();
      return res.success(objGet, 200, 'success');
    } catch (err) {
      console.error('# Error Controller ApiV1CardStatus.ListGet:', err);
      return res.error(err);
    }
  },
};

module.exports = ApiV1CardStatus;
