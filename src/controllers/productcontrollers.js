const product = require("../models/productmodel");

const createproduct = async (req, res) => {
//   try {

    const { name, type, brand, description, price, discount, stock } = req.body;
    const { image, image_urls } = req.files;

    const newproduct = {
      name,
      type,
      brand,
      description,
      price,
      discount,
      stock,
      image,
      image_urls,
    };

    const updateproduct = await new product(newproduct).save();
    res.status(200).json({message:'data is retrieved',data:updateproduct});

//   } catch (err) {
//     res.status(500).send("internal serval error");
//   }
};
module.exports = {createproduct};

