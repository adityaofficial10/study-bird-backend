const express = require('express');
const router = express.Router();
const summController = require('../api/controllers/summary')

router.post('/',summController.analyseText);

module.exports = router;