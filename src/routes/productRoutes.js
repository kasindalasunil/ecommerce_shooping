const express = require("express");
const {
  createproduct,
  updateproduct,
  getproduct,
  getOrdersForSellers,
} = require("../controllers/productcontrollers");
const verifyToken = require("../middleware/authorization");
const checkSellerRole = require("../middleware/authenticate");

const productrouter = express.Router();

productrouter.post("/", verifyToken, checkSellerRole, createproduct);
productrouter.put("/:id", verifyToken, checkSellerRole, updateproduct);
productrouter.get("/", getproduct);
productrouter.get("/seller", verifyToken, checkSellerRole, getOrdersForSellers);

module.exports = productrouter;
