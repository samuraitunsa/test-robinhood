const _ = require('lodash')

const helperCardStatus = {
  _map_card_status_data: function(data) {
    let obj = {};
    if (data) {
      if (data.hasOwnProperty('uuid')) obj.id = data.uuid;
      if (data.hasOwnProperty('name')) obj.name = data.name;
      if (data.hasOwnProperty('type')) obj.type = data.type;
    }
    return obj;
  },
  _map_card_status_list: function(list) {
    let arrList = [];
    _.forEach(list, function(data) {
      arrList.push(helperCardStatus._map_card_status_data(data));
    });
    return arrList;
  },
};

module.exports = helperCardStatus;
