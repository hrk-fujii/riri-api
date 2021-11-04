var express = require('express');
var sendError = require('../utils/sendError');
var roomsController = require('../controllers/get/rooms');
var schedulesController = require('../controllers/get/schedules');
var router = express.Router();


// GET API
router.get('/rooms', roomsController);
router.get('/schedules', schedulesController);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
