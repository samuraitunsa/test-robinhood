const _ = require('lodash')

const helperCardComment = {
  _map_card_comment_data: function(data, req) {
    let obj = {};
    if (data) {
      if (data.hasOwnProperty('uuid')) obj.id = data.uuid;
      if (data.hasOwnProperty('description')) obj.description = data.description;
      if (data.hasOwnProperty('created_at')) obj.created_at = data.created_at;
      if (data.hasOwnProperty('email')) obj.user_profile = global.Helper.Web.V1.User._map_user_data(data, req)
    }
    return obj;
  },
  _map_card_comment_list: function(list, req) {
    let arrList = [];
    _.forEach(list, function(data) {
      arrList.push(helperCardComment._map_card_comment_data(data, req));
    });
    return arrList;
  },
};

module.exports = helperCardComment;
