var express = require('express');
var apiController = require('../app/controllers/apiController');
var router = express.Router();

router.get('/', apiController.show);

module.exports = router;
