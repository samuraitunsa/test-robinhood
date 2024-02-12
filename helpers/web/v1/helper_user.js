const _ = require('lodash')

const helperUser = {
  _map_user_data: function(data, req) {
    let obj = {};
    if (data) {
      if (data.hasOwnProperty('uuid')) obj.id = data.uuid;
      if (data.hasOwnProperty('user_name')) obj.user_name = data.user_name;
      if (data.hasOwnProperty('email')) obj.email = data.email;
      if (data.hasOwnProperty('first_name')) obj.first_name = data.first_name;
      if (data.hasOwnProperty('last_name')) obj.last_name = data.last_name;
      if (data.hasOwnProperty('role_name')) obj.role_name = data.role_name;
      const endpointUrl = `${req.protocol}://${req.headers.host}`
      if (parseInt(data.user_avatar_type) !== 1) {
        obj.avatar_full_path = `${endpointUrl}/uploads/medias/${data.path}${data.file_name}.${data.extension}`
      } else {
        obj.avatar_full_path = `${endpointUrl}/uploads/medias/${data.file_name}.${data.extension}`
      }
    }
    return obj;
  },
  _map_user_list: function(list) {
    let arrList = [];
    _.forEach(list, function(data) {
      arrList.push(helperUser._map_user_data(data));
    });
    return arrList;
  },
};

module.exports = helperUser;
