require('dotenv').config();
const app  = require('./src/app');
const connect_to_database = require('./src/dbConfig/config');

// connect db
connect_to_database();
console.log("bae url", process.env.BASE_URL)

app.listen(3000,()=>{
    console.log('server is listening to port 3000');
})