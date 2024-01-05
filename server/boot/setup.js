const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const app = express();
const PORT = 8080; //USE env file later


// custom middleware

const cors = require('cors');
const session = require('express-session');

// Routes 



// mongodb connection 


// Middleware Registration

// Route Registration




// error handler


// start server 

const startApp = async () => {
    try {
        // start by running the middleware registeration

        app.listen(PORT, () => {
            // log the information
            console.log(`Server started on port ${PORT}`);
        })
        // handle errors with function

    }catch(err){
        

    }
}