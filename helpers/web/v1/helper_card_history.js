const _ = require('lodash')

const helperCardHistory = {
  _map_card_history_data: function(data) {
    let obj = {};
    if (data) {
      if (data.hasOwnProperty('uuid')) obj.id = data.uuid;
      if (data.hasOwnProperty('title')) obj.title = data.title;
      if (data.hasOwnProperty('description')) obj.description = data.description;
      if (data.hasOwnProperty('name') && data.hasOwnProperty('type')) obj.card_status = global.Helper.Web.V1.CardStatus._map_card_status_data(data)

    }
    return obj;
  },
  _map_card_history_list: function(list) {
    let arrList = [];
    _.forEach(list, function(data) {
      arrList.push(helperCardHistory._map_card_history_data(data));
    });
    return arrList;
  },
};

module.exports = helperCardHistory;
