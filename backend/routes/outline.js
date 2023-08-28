const express = require('express');
const router = express.Router();
const outlineController = require('../controllers/outlineController');

router.post('/generateOutline', outlineController.generateOutline);

module.exports = router;
