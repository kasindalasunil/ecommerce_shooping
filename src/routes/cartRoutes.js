const express = require('express');
const { cartcreation,getcart} = require('../controllers/cartcontrollers');

// const {cartcreation}  = require('../routes/cartRoutes');

const cartrouter = express.Router();


cartrouter.post('/',cartcreation);
cartrouter.get('/items',getcart);





module.exports = cartrouter;

