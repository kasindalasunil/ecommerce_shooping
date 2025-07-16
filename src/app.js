const express =  require('express')
const productrouter = require('../src/routes/productRoutes');
const upload = require('../src/middleware/authmiddleware');
const cartrouter = require('../src/routes/cartRoutes');
const userrouter = require('../src/routes/userroute');
const verifyToken = require('../src/middleware/authorization');


const app  = express();

// app.use(upload.any());
app.use(express.json());
app.use('/uploads', express.static('uploads'))



// app.get('/', (req,res)=>{
//     res.send("API is working fine !");
// });
app.use(upload.any());

app.use('/api/product',productrouter);

app.use('/api/cart',verifyToken,cartrouter);

app.use('/api/user',userrouter);



module.exports = app;

