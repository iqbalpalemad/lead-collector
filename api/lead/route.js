const express = require('express');
const router = express.Router();
const { createLead, updateLead, listLeads } = require('./controller');
const auth = require('../../middleware/auth');

router.post('/', auth, createLead);
router.put('/:id', auth, updateLead);
router.get('/:campId', auth, listLeads);

module.exports = router;
