const express = require('express');
const router = express.Router();
const listingServices = require('../services/listing.service');

router.get('/:listingId', listingServices.listing_details);
router.get('/:listingId/favourite', listingServices.addToFav);
module.exports = router;