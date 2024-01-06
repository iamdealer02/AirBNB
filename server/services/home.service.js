const statusCode = require('../constants/statusCode');
const logger = require('../middleware/winston');
const Listing = require('../models/listing')



const getListings = async (req, res) => {
    // use the mongoDB database to get the listings
    try{
        const listings = await Listing.find();
        logger.info(`Successfully retrieved listings`);
        res.status(statusCode.success).json({listings});
        console.log(listings);
    }catch(error){
        logger.error(`Error retrieving listings: 
        ${JSON.stringify(error, undefined, 2)}`);
        res.status(statusCode.badRequest)
        .json({error});
    }

     
};

module.exports = {getListings};
