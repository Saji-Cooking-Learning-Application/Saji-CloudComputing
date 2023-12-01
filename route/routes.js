const express = require('express');
const handler = require('../controller/handler');

const router = new express.Router();

router.get('/', handler.base);
// router.post('/login', handler.login);

module.exports = router;
