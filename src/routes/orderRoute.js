const express = require('express');
const {createOrder} = require('../controllers/ordercontrollers');

const orderrouter = express.Router();

orderrouter.post('/', createOrder);


module.exports = orderrouter;
