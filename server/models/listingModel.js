const mongoose = require('mongoose');

const listingSchema = new mongooseSchema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    contact: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
},
{
    timestamps : {
        created_at: "createdAt",
    }
});

module.exports = mongoose.model("Listing", listingSchema);