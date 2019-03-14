const express = require('express');
const apiController = require('../app/controllers/ApiController');

const router = express.Router();

router.get('/', apiController.show);

module.exports = router;
