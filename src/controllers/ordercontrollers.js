const order = require('../models/ordermodel');
const product  =require('../models/productmodel')
const createOrder = async (req, res) => {
  try {
    const { products , payment_method, payment_status, order_status} = req.body;
 
    console.log(products);
    // get the user id
    const userId = req.user;
 
    if (products.length === 0) {
      res.status(400).json({ message: "No items available !" });
    }
 
    let items = [];
    let total_summary = 0;
 
    //   iterate the products
    for (let Product of products) {
      // destructure the product properties
      const { product_id, quantity } = Product;
 
      if (!product_id) {
        return res.status(404).json({
          message: `Missing Products feilds ( product id for id:${product_id}`,
        });
      }
 
      // get the product detail from db by id
      const productDetail = await product.findById(product_id);
 
      // if product detail not found send error message
      if (!productDetail) {
        return res.status(404).json({
          message: `Product not found !`,
        });
      }
 
      const productPrice = productDetail.price;
      const totalPrice = productPrice * (Number(quantity) || 1);
 
      // construct the obj
      const item = {
        product_id,
        quantity: quantity || 1,
        price_at_purchase: totalPrice,
      };
 
      items.push(item);
 
      // logic for grand total
      total_summary += totalPrice;
    }
 
    //   insert the data to db
    const newOrder = await new order({
      user_id: userId,
      total_summary,
      payment_method,
      payment_status,
      order_status,
      items
    });
    await newOrder.save();
    return res
      .status(200)
      .json({ message: " Order Placed Successfully", data: newOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createOrder,
};
 