'use strict';
const { ErrorNotFound, ErrorUnauthorized } = require('../../libs/error_methods');


const Card  = {
  GetCard : async (req) => {
    console.log('# Service Card.GetCard');
    return new Promise(async (resolve, reject) => {
      try {
        const user = req.user

        const _getCard = await global.Model.Card.GetCard()
        if (_getCard.rowCount > 0) {
          const _fetchDataCardRow = _getCard.rows
          const _fetchCardList = global.Helper.Web.V1.Card._map_card_list(_fetchDataCardRow, req)
          return resolve(_fetchCardList)
        }
      } catch (err) {
        return reject(err);
      }
    });
  },
  SetCreateCard : async (req) => {
    console.log('# Service Card.SetCreateCard');
    return new Promise(async (resolve, reject) => {
      try {
        const user = req.user
        const body = req.body
        
        const _fetchDataCardStatus = await global.Model.CardStatus.GetCardStatus()
        if (_fetchDataCardStatus.rowCount === 0) {
            return reject(ErrorNotFound(`ไม่มี Card Status`));
        }
        const uuidCardStatusToDo = _fetchDataCardStatus.rows.filter(item => item.type === 1)[0].uuid
        const _saveCard = await global.Model.Card.InsertCard(body, user.uuid, uuidCardStatusToDo)
        if (_saveCard.rowCount > 0) {
          await global.Model.CardHistory.InsertCardHistory(body, _saveCard.rows[0].uuid, uuidCardStatusToDo, user.uuid)
          return resolve(_saveCard)
        }
      } catch (err) {
        return reject(err);
      }
    });
  },
  SetUpdateCard : async (req) => {
    console.log('# Service Card.SetUpdateCard');
    return new Promise(async (resolve, reject) => {
      try {
        const user = req.user
        const body = req.body
        const uuidCard = req.params.uuid

        const _updateCard = await global.Model.Card.UpdateCard(body, uuidCard)
        if (_updateCard.rowCount > 0) {
          await global.Model.CardHistory.InsertCardHistory(body, uuidCard, body.card_status_id, user.uuid)
          return resolve(_updateCard)
        }
      } catch (err) {
        return reject(err);
      }
    });
  },
  SetUpdateCardStore : async (req) => {
    console.log('# Service Card.SetUpdateCardStore');
    return new Promise(async (resolve, reject) => {
      try {
        const user = req.user
        const body = req.body
        const uuidCard = req.params.uuid

        const _fetchDataCardStatus = await global.Model.CardStatus.GetCardStatus()
        if (_fetchDataCardStatus.rowCount === 0) {
            return reject(ErrorNotFound(`ไม่มี Card Status`));
        }
        const uuidCardStatusStore = _fetchDataCardStatus.rows.filter(item => item.type === 4)[0].uuid
        const _updateCardStore = await global.Model.Card.UpdateCardStore(uuidCard, uuidCardStatusStore)
        if (_updateCardStore.rowCount > 0) {
          return resolve(_updateCardStore)
        }
      } catch (err) {
        return reject(err);
      }
    });
  },
  GetCardComment : async (req) => {
    console.log('# Service Card.GetCardComment');
    return new Promise(async (resolve, reject) => {
      try {
        const user = req.user
        const uuidCard = req.params.uuid

        const _getCardComment = await global.Model.CardComment.GetCardComment(uuidCard)
        if (_getCardComment.rowCount > 0) {
          const _fetchDataCardCommentRow = _getCardComment.rows
          const _fetchCardCommentList = global.Helper.Web.V1.CardComment._map_card_comment_list(_fetchDataCardCommentRow, req)
          return resolve(_fetchCardCommentList)
        }
      } catch (err) {
        return reject(err);
      }
    });
  },
  SetCreateCardComment : async (req) => {
    console.log('# Service Card.SetCreateCardComment');
    return new Promise(async (resolve, reject) => {
      try {
        const user = req.user
        const body = req.body
        const uuidCard = req.params.uuid

        const _saveCardComment = await global.Model.CardComment.InsertCardComment(body, user.uuid, uuidCard)
        if (_saveCardComment.rowCount > 0) {
          const uuidCardComment = _saveCardComment.rows[0].uuid
          await global.Model.CardCommentRole.InsertCardCommentRole(uuidCardComment, user.uuid)
          return resolve(_saveCardComment)
        }
      } catch (err) {
        return reject(err);
      }
    });
  },
  SetDeleteCardComment : async (req) => {
    console.log('# Service Card.SetDeleteCardComment');
    return new Promise(async (resolve, reject) => {
      try {

        const uuidCard = req.params.uuid
        const uuidCardComment = req.params.comment_uuid
        const uuidUser = req.user.uuid

        const checkComment = await global.Model.CardCommentRole.checkAuthorized(uuidCardComment, uuidUser)
        if (checkComment.rowCount === 0) {
          return reject(ErrorUnauthorized(`not authorized`));
        }
        
        const _deleteCardComment = await global.Model.CardComment.DeleteCardComment(uuidCardComment)
        if (_deleteCardComment.rowCount > 0) {
          return resolve(_deleteCardComment)
        }
      } catch (err) {
        return reject(err);
      }
    });
  },
  SetEditCardComment : async (req) => {
    console.log('# Service Card.SetEditCardComment');
    return new Promise(async (resolve, reject) => {
      try {

        const uuidCard = req.params.uuid
        const uuidCardComment = req.params.comment_uuid
        const body = req.body
        const uuidUser = req.user.uuid

        const checkComment = await global.Model.CardCommentRole.checkAuthorized(uuidCardComment, uuidUser)
        if (checkComment.rowCount === 0) {
          return reject(ErrorUnauthorized(`not authorized`));
        }
        
        const _editCardComment = await global.Model.CardComment.EditCardComment(body, uuidCardComment)
        if (_editCardComment.rowCount > 0) {
          return resolve(_editCardComment)
        }
      } catch (err) {
        return reject(err);
      }
    });
  },
  GetCardHistory : async (req) => {
    console.log('# Service Card.GetCardHistory');
    return new Promise(async (resolve, reject) => {
      try {
        const uuidCard = req.params.uuid

        const _getCardHistory = await global.Model.CardHistory.GetCardHistory(uuidCard)
        if (_getCardHistory.rowCount > 0) {
          const _fetchDataCardRow = _getCardHistory.rows
          const _fetchCardHistoryList = global.Helper.Web.V1.CardHistory._map_card_history_list(_fetchDataCardRow, req)
          return resolve(_fetchCardHistoryList)
        }
      } catch (err) {
        return reject(err);
      }
    });
  },
};

module.exports = Card;
