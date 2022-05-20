const express = require('express');
const router = express.Router();
const authel = require('../helper/auth-log-reg')
// const { validatesignup, userValidation } = require('../middleware/user')
router.post('/signup',  authel.signup)
// router.post('/signin',  authel.signin)
router.post('/deposit', authel.deposit)
router.post('/check', authel.check)

module.exports = router;
