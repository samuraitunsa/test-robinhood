'use strict';

module.exports = {
  INDEX: '/',
  V1: {
    LIST: '/list',
    MEDIA: '/media',
    REGISTER: '/register',
    LOGIN: '/login',
    CARD: '/card',
    CARD_UPDATE: '/card/:uuid',
    CARD_STORE: '/card/:uuid/store',
    CARD_COMMENT: '/card/:uuid/comment',
    CARD_COMMENT_EDIT: '/card/:uuid/comment/:comment_uuid',
    CARD_COMMENT_DELETE: '/card/:uuid/comment/:comment_uuid',
    CARD_HISTORY: '/card/:uuid/history',
    CARD_STATUS: '/card-status',
  },
};
