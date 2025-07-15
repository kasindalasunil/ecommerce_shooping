const express = require('express');
const {createproduct,updateproduct,getproduct} = require('../controllers/productcontrollers');

const productrouter = express.Router();

productrouter.post('/',createproduct);
productrouter.put('/:id',updateproduct);

productrouter.get('/',getproduct);



module.exports = productrouter;
