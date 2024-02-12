'use strict';
const { body, query, param, check } = require('express-validator');

const rules = {
  title: body('title')
    .notEmpty().withMessage('Title not empty').bail()
    .isString().withMessage('Title must be string').bail(),
  description: body('description')
    .notEmpty().withMessage('Description not empty').bail()
    .isString().withMessage('Description must be string').bail(),
  uuid: param('uuid')
    .isUUID().withMessage('Invalid UUID').bail()
    .custom(async (value, { req }) => {
      if (value == null) {
        return Promise.reject('Invalid UUID');
      }
      try {
        const _fetchData = await global.Model.Card.GetCardByUuid(value)
        if (_fetchData.rowCount === 0) {
          return Promise.reject('Card not found');
        }
        req.fetchCard = _fetchData.rows[0];
        return Promise.resolve();
      } catch (e) {
        return Promise.reject('Card not found.');
      }
    }).bail(),
  card_status_id: body('card_status_id')
    .isUUID().withMessage('Invalid UUID').bail()
    .notEmpty().withMessage('Card Status Id not empty').bail()
    .isString().withMessage('Card Status Id must be string').bail(),
  comment_uuid: param('comment_uuid')
    .isUUID().withMessage('Invalid UUID').bail()
    .custom(async (value, { req }) => {
      if (value == null) {
        return Promise.reject('Invalid UUID');
      }
      try {
        const _fetchData = await global.Model.CardComment.GetCommentByUuid(value)
        console.log("vaue", value)
        if (_fetchData.rowCount === 0) {
          return Promise.reject('Comment not found');
        }
        req.fetchCardComment = _fetchData.rows[0];
        return Promise.resolve();
      } catch (e) {
        return Promise.reject('Comment not found.');
      }
    }).bail(),
};

module.exports = {
  checkCard: [rules.title, rules.description],
  checkUpdateCard: [rules.uuid, rules.title, rules.description, rules.card_status_id],
  checkStoreCard: [rules.uuid],
  checkGetCardHistory: [rules.uuid],
  checkGetCardComment: [rules.uuid],
  checkPostCardComment: [rules.uuid, rules.description],
  checkEditCardComment: [rules.uuid, rules.comment_uuid, rules.description],
  checkDeleteCardComment: [rules.uuid, rules.comment_uuid],
};
