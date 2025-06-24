const express = require('express');
const router = express.Router();
const { createCamp, listCamps } = require('./controller');
const auth = require('../../middleware/auth');

router.post('/', auth, createCamp);
router.get('/', auth, listCamps);

module.exports = router;
