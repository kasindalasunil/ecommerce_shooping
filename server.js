const app  = require('./src/app');
const mongoose = require('mongoose');
const connect_to_database = require('./src/dbConfig/config');

// connect db
connect_to_database();

app.listen(3000,()=>{
    console.log('server is listening to port 3000');
})