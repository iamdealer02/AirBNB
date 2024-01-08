const express = require('express');
const router = express.Router();
const authServices = require('../services/auth.service');

router.post('/register', authServices.register );
router.get('/login' , authServices.login);
router.get('/logout', authServices.logout );

module.exports = router;