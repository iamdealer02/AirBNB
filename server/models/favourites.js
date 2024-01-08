const mongoose = require('mongoose');

const favouriteListingsSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    favouriteListings : {
        type: Array
    }
},{
    timestamps: {
        createdAt: "createdAt",
    },
})

module.exports = mongoose.model("FavouriteListings", favouriteListingsSchema);