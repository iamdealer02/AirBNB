const express = require('express');
const router = express.Router();
const authServices = require('../services/auth.service');

router.get('/register', authServices.register );

module.exports = router;