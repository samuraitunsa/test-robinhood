const _ = require('lodash')

const helperCard = {
  _map_card_data: function(data, req) {
    let obj = {};
    if (data) {
      if (data.hasOwnProperty('uuid')) obj.id = data.uuid;
      if (data.hasOwnProperty('title')) obj.title = data.title;
      if (data.hasOwnProperty('description')) obj.description = data.description;
      if (data.hasOwnProperty('created_at')) obj.created_at = data.created_at;
      if (data.hasOwnProperty('email')) obj.user_profile = global.Helper.Web.V1.User._map_user_data(data, req)
      if (data.hasOwnProperty('name') && data.hasOwnProperty('type')) obj.card_status = global.Helper.Web.V1.CardStatus._map_card_status_data(data, req)
      
    }
    return obj;
  },
  _map_card_list: function(list, req) {
    let arrList = [];
    _.forEach(list, function(data) {
      arrList.push(helperCard._map_card_data(data, req));
    });
    return arrList;
  },
};

module.exports = helperCard;
