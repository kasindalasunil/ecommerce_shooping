const express =  require('express')
const router = require('./routes/route')

const app  = express();

app.use(express.json());

// app.get('/', (req,res)=>{
//     res.send("API is working fine !");
// });
// app.use('/product', productRouter);
app.use('/', router);

module.exports = app;

