const cart = require("../models/cartmodel");
const cartcreation = async (req, res) => {
  // destructuring the carts from req.body
  const { carts } = req.body;
  console.log(carts);
  //accessing userId from middleware
  const userId = req.user;
  //finding the userId using token
  const cartexist = await cart.findOne({ user_id: userId });
  console.log(cartexist);
  // check if the cart have items or not
  if (!cartexist) {
    const Cart = await new cart({
      user_id: userId,
      items: carts,
    });
    Cart.save();
    console.log(cartexist);
    res.status(200).json({ message: "data is retrieved", data: Cart });
  } else {
    // if the cart have products,now we have to increase quantity
    cartexist.items = carts;
    await cartexist.save();
    res.status(200).json({ message: "data is recieved", data: cartexist });
  }
};

const getcart = async (req, res) => {
  const userId = req.user;
  const Cart = await cart.findOne({ user_id: userId });
  if (!Cart) {
    return res.status(404).send("error");
  }
  console.log(Cart);
  return res
    .status(200)
    .json({ message: "data retreived successfully", getdata: Cart });
};

module.exports = { cartcreation, getcart };
