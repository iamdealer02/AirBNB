const express = require('express');
const router = express.Router();
const homeServices = require('../services/home.service');

router.get('/', homeServices.getListings);

module.exports = router;