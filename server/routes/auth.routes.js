const express = require('express');
const router = express.Router();
const authServices = require('../services/auth.service');

router.get('/register', authServices.register );
router.get('/login' , authServices.login);

module.exports = router;