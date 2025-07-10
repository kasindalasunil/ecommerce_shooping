const express =  require('express')
// const router = require('../src/routes/route')
const productrouter = require('../src/routes/productRoutes');
const upload = require('../src/middleware/authmiddleware');


const app  = express();

app.use(upload.any());
app.use(express.json());



// app.get('/', (req,res)=>{
//     res.send("API is working fine !");
// });
app.use('/product', productrouter);
// app.use('/', productrouter);

module.exports = app;

