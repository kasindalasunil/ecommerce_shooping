const express =  require('express')
// const router = require('../src/routes/route')
const productrouter = require('../src/routes/productRoutes');
const upload = require('../src/middleware/authmiddleware');
const cartrouter = require('../src/routes/cartRoutes');



const app  = express();

// app.use(upload.any());
app.use(express.json());
app.use('/uploads', express.static('uploads'))



// app.get('/', (req,res)=>{
//     res.send("API is working fine !");
// });
app.use('/product',upload.any(), productrouter);
// app.use('/', productrouter);
app.use('/product',productrouter);

app.use('/product',productrouter);


module.exports = app;

