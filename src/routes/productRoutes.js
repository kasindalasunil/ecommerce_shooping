const express = require('express');
const {createproduct} = require('../controllers/productcontrollers');

const productrouter = express.Router();

productrouter.post('/',createproduct);

module.exports = productrouter;
