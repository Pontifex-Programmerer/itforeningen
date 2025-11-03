const mongoose = require('mongoose');

async function connectToDatabase(uri, dbName){
    try {
        const result = await mongoose.connect(uri, {dbName})
        if(result) {
            console.log(`Connected to ${result.connection.name}`);
        }
    } catch(error) {
        console.error(`dbhandler.js:connectToDatabase -> ${error}`);
    }
}

module.exports={
    connectToDatabase
}