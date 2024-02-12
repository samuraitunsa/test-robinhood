'use strict';
const { ErrorNotFound } = require('../../libs/error_methods');


const CardStatus  = {
  GetCardStatus : async () => {
    console.log('# Service User.GetCardStatus');
    return new Promise(async (resolve, reject) => {
      try {

        const _fetchDataCardStatus = await global.Model.CardStatus.GetCardStatus()
        if (_fetchDataCardStatus.rowCount === 0) {
            return reject(ErrorNotFound(`ไม่มี Card Status`));
        }
        
        let _fetchDataCardStatusList = _fetchDataCardStatus.rows.filter(item => item.type !== 4)
        _fetchDataCardStatusList = global.Helper.Web.V1.CardStatus._map_card_status_list(_fetchDataCardStatusList)
        return resolve(_fetchDataCardStatusList)
        
      } catch (err) {
        return reject(err);
      }
    });
  },
};

module.exports = CardStatus;
