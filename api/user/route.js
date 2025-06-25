const express = require('express');
const router = express.Router();
const { listUsers } = require('./controller');
const auth = require('../../middleware/auth');

router.get('/', auth, listUsers);

module.exports = router;
