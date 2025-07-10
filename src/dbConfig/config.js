const mongoose = require("mongoose");

async function connect_to_database(){
    await mongoose
    .connect('mongodb://localhost:27017/sunil')
    .then(()=>console.log('connected'))
    .catch((err)=>console.log('error occurred'))
};

module.exports = connect_to_database;