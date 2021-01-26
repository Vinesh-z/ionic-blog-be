const mongoose = require('mongoose');
const allUrl = require('./hostId');
mongoose.connect(allUrl.mongoDb,(err)=>
{
    if(!err)
        console.log('MongoDb Connection Successful.....');
    else 
        console.log('Error in Db Connection:' + JSON.stringify(err,undefined,2));
});

module.exports = mongoose;