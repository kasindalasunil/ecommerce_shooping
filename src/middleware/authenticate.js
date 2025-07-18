const User = require('../models/usermodel');

const checkSellerRole = async (req, res, next) => {
  const userId = req.user.id;

  // get the user deatils
  const userDetail = await User.findById(userId);
  const userRole = userDetail.role;

  if (userRole !== "seller") {
    return res.status(404).send("only seller can update the product");
  }
  next();
};
module.exports = checkSellerRole;

