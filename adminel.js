const express = require('express');
const router = express.Router();
const adminel = require('../helper/admin')
router.post('/login',  adminel.admin)
module.exports = router;
