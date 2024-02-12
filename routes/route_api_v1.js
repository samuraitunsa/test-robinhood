const express = require('express');
const router = express.Router();
const RouterApi = global.config.routes.api;

const Middleware = require('../middleware/utilities');

const Validation = require('../middleware/validation/validation');
const ValidationUser = require('../middleware/validation/validation_user');
const ValidationCard = require('../middleware/validation/validation_card');


const ApiV1Index = require('../controllers/api/v1/controller_api_index');
const ApiV1Media = require('../controllers/api/v1/controller_api_media');
const ApiV1User = require('../controllers/api/v1/user/controller_api_user');
const ApiV1Card = require('../controllers/api/v1/user/controller_api_card');
const ApiV1CardStatus = require('../controllers/api/v1/user/controller_api_card_status');

router.get(RouterApi.INDEX, ApiV1Index.IndexGet);
router.post(RouterApi.V1.MEDIA, ApiV1Media.MediaPost);

// login && register
router.post(RouterApi.V1.REGISTER, [ValidationUser.checkRegister, Validation], ApiV1User.CreatePost);
router.post(RouterApi.V1.LOGIN, [ValidationUser.checkLogin, Validation], ApiV1User.LoginPost);

// card
router.get(RouterApi.V1.CARD, [Middleware.CheckApiKey, Middleware.AuthenticatedApi], ApiV1Card.ListGet);
router.get(RouterApi.V1.CARD_STATUS, [Middleware.CheckApiKey, Middleware.AuthenticatedApi], ApiV1CardStatus.ListGet);
router.post(RouterApi.V1.CARD, [Middleware.CheckApiKey, Middleware.AuthenticatedApi, ValidationCard.checkCard, Validation], ApiV1Card.CreatePost);
router.put(RouterApi.V1.CARD_UPDATE, [Middleware.CheckApiKey, Middleware.AuthenticatedApi, ValidationCard.checkUpdateCard, Validation], ApiV1Card.UpdatePut);
router.patch(RouterApi.V1.CARD_STORE, [Middleware.CheckApiKey, Middleware.AuthenticatedApi, ValidationCard.checkStoreCard, Validation], ApiV1Card.UpdatePatch);
router.get(RouterApi.V1.CARD_COMMENT, [Middleware.CheckApiKey, Middleware.AuthenticatedApi, ValidationCard.checkGetCardComment, Validation], ApiV1Card.ListCommentGet);
router.post(RouterApi.V1.CARD_COMMENT, [Middleware.CheckApiKey, Middleware.AuthenticatedApi, ValidationCard.checkPostCardComment, Validation], ApiV1Card.CreateCommentPost);
router.put(RouterApi.V1.CARD_COMMENT_EDIT, [Middleware.CheckApiKey, Middleware.AuthenticatedApi, ValidationCard.checkEditCardComment, Validation], ApiV1Card.EditCommentPut);
router.delete(RouterApi.V1.CARD_COMMENT_DELETE, [Middleware.CheckApiKey, Middleware.AuthenticatedApi, ValidationCard.checkDeleteCardComment, Validation], ApiV1Card.RemoveCommentDelete);
router.get(RouterApi.V1.CARD_HISTORY, [Middleware.CheckApiKey, Middleware.AuthenticatedApi, ValidationCard.checkGetCardHistory, Validation], ApiV1Card.ListHistoryGet);



module.exports = router;
