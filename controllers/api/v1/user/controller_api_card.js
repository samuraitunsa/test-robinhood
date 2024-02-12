'use strict';
const _ = require('lodash');

const ApiV1Card = {
  ListGet: async (req, res, next) => {
    console.log('# Controller ApiV1Card.ListGet');
    try {
        let objGet = await global.Service.User.Card.GetCard(req);
        return res.success(objGet, 0, 'success');
    } catch (err) {
      console.error('# Error Controller ApiV1Card.ListGet', err);
      return res.error(err);
    }
  },
  CreatePost: async (req, res, next) => {
    console.log('# Controller ApiV1Card.CreatePost');
    try {
      const resCard = await global.Service.User.Card.SetCreateCard(req)
      return res.success({}, 201, 'sucess');
    } catch (err) {
      console.error('# Error Controller ApiV1Card.CreatePost', err);
      return res.error(err);
    }
  },
  UpdatePut: async (req, res, next) => {
    console.log('# Controller ApiV1Card.UpdatePut');
    try {
      const resCard = await global.Service.User.Card.SetUpdateCard(req)
      return res.success({}, 200, 'sucess');
    } catch (err) {
      console.error('# Error Controller ApiV1Card.UpdatePut', err);
      return res.error(err);
    }
  },
  UpdatePatch: async (req, res, next) => {
    console.log('# Controller ApiV1Card.UpdatePatch');
    try {
      const resCard = await global.Service.User.Card.SetUpdateCardStore(req)
      return res.success({}, 200, 'sucess');
    } catch (err) {
      console.error('# Error Controller ApiV1Card.UpdatePatch', err);
      return res.error(err);
    }
  },
  ListCommentGet: async (req, res, next) => {
    console.log('# Controller ApiV1Card.ListCommentGet');
    try {
        let objGet = await global.Service.User.Card.GetCardComment(req);
        return res.success(objGet, 0, 'success');
    } catch (err) {
      console.error('# Error Controller ApiV1Card.ListCommentGet', err);
      return res.error(err);
    }
  },
  CreateCommentPost: async (req, res, next) => {
    console.log('# Controller ApiV1Card.CreateCommentPost');
    try {
      const resCard = await global.Service.User.Card.SetCreateCardComment(req)
      return res.success({}, 201, 'sucess');
    } catch (err) {
      console.error('# Error Controller ApiV1Card.CreateCommentPost', err);
      return res.error(err);
    }
  },
  UpdatePut: async (req, res, next) => {
    console.log('# Controller ApiV1Card.UpdatePut');
    try {
      const resCard = await global.Service.User.Card.SetUpdateCard(req)
      return res.success({}, 200, 'sucess');
    } catch (err) {
      console.error('# Error Controller ApiV1Card.UpdatePut', err);
      return res.error(err);
    }
  },
  RemoveCommentDelete: async (req, res, next) => {
    console.log('# Controller ApiV1Card.RemoveCommentDelete');
    try {
      const resCard = await global.Service.User.Card.SetDeleteCardComment(req)
      return res.success(resCard, 200, 'sucess');
    } catch (err) {
      console.error('# Error Controller ApiV1Card.RemoveCommentDelete', err);
      return res.error(err);
    }
  },
  EditCommentPut: async (req, res, next) => {
    console.log('# Controller ApiV1Card.EditCommentPut');
    try {
      const resCard = await global.Service.User.Card.SetEditCardComment(req)
      return res.success(resCard, 200, 'sucess');
    } catch (err) {
      console.error('# Error Controller ApiV1Card.EditCommentPut', err);
      return res.error(err);
    }
  },
  ListHistoryGet: async (req, res, next) => {
    console.log('# Controller ApiV1Card.ListHistoryGet');
    try {
        let objGet = await global.Service.User.Card.GetCardHistory(req);
        return res.success(objGet, 0, 'success');
    } catch (err) {
      console.error('# Error Controller ApiV1Card.ListHistoryGet', err);
      return res.error(err);
    }
  },
};

module.exports = ApiV1Card;
