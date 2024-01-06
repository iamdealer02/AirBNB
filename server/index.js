const {startApp} = require("./boot/setup");
const logger = require("./middleware/winston");

(async() =>{
    try{
        await startApp();
        logger.info('Application started');
    }catch(err){
        
        logger.error(`Error in index.js => startApp() : ${JSON.stringify(err, undefined, 2)}`);
    }
})();