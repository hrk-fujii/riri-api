var express = require('express');
// var middleware = require('./middlewares/api');
var sendError = require('../utils/sendError');

var createController = require('../controllers/secure/create');
//var deleteController = require('../controllers/secure/delete');
//var editController = require('../controllers/secure/edit');

var router = express.Router();


/* POST MIDDLE */
 // router.use(middleware.auth);

/* POST API */
router.post('/create', createController);
//router.post('/delete', deleteController);
//router.post('/edit', editController);

router.use((err, req, res, next) => {
  sendError(res, err);
})

module.exports = router;
