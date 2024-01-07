// get details of the accomodation clicked
const statusCode = require('../constants/statusCode');
const logger = require('../middleware/winston');
const listingModel = require('../models/listing')

const listing_details = async(req, res) => {
    // get details of the listing user clicked on 
    // pass the listing_id in the path variables
    const {listingId} = req.params;
    if (!listingId){
        res.status(statusCode.badRequest)
        .json({message: 'Missing path Varibles'})
    }else{
        try{
            const listingDetails = await listingModel.find({_id: listingId})
            if(listingDetails){
                res.status(statusCode.success)
                .json({message: listingDetails})
            }else{
                res.status(statusCode.badGateway)
                .json({message: 'No such id found'})
            }
        }catch(error){
            logger.error(error.stack);
            res.status(statusCode.queryError).json({message: "Error while fetching the Listing details"})
        }
    }
}

module.exports = {
    listing_details,
}