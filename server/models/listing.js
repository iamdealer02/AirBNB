const mongoose = require('mongoose');

const Listing = mongoose.model('Listing', mongoose.Schema({}), 'Listing' );

module.exports = Listing;
