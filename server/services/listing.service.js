// get details of the accomodation clicked
const statusCode = require('../constants/statusCode');
const logger = require('../middleware/winston');
const listingModel = require('../models/listing')
const favouriteListingsModel = require('../models/favourites')

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

const addToFav = async(req, res) => {
    // add to customers favourite list
    const {listingId} = req.params;
    const email = req.session.user ? req.session.user.email : null;
    console.log(email);
    if (!listingId){
        res.status(statusCode.badRequest)
        .json({message: 'Missing path Varibles'})
    }else{
        try{
            // check if the array already has the listing
            // remove it if it already exists and add if it doesnt
            const listingExists = await favouriteListingsModel.findOne({
                email: email,
                favouriteListings: { $elemMatch: { $eq: listingId } }
              });
              if (listingExists){
                // remove it from the fav
                const result = await favouriteListingsModel.updateOne(
                    { email: email },
                    { $pull: { favouriteListings: listingId } },
                  ); 
                  res.status(statusCode.success)
                  .json({message: result});
                  logger.info("Listing removes successfully to favourite")
                    

              }else{
                const result = await favouriteListingsModel.updateOne(
                    { email: email },
                    { $push: { favouriteListings: listingId } },
                    
                { upsert: true } // Add the upsert option
                  ); 
                  res.status(statusCode.success)
                  .json({message: result});
                  logger.info("Listing added successfully to favourite")
                    

              }
            

            
        }catch(error){
            logger.error(error.stack);
            res.status(statusCode.queryError).
            json({message: "Error while executing query to add Lisitng to the Favourite"})
        }
    }
    
}

module.exports = {
    listing_details,
    addToFav,
}