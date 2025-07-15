const product = require("../models/productmodel");
const BASE_URL = process.env.BASE_URL;
console.log(BASE_URL);

const getprimaryImage = (files) => {
  const primaryImage = files.find((el) => el.fieldname === "image");
  if (primaryImage) {
    return BASE_URL + primaryImage.filename;
  }
};

const getadditionalImages = (files) => {
  const additionalImages = files.filter((el) => el.fieldname === "images");
  console.log(additionalImages);
  const urlsArray = [];
  if (additionalImages.length > 0) {
    additionalImages.forEach((img) => {
      const url = BASE_URL + img.filename;
      urlsArray.push(url);
    });
    return urlsArray;
  }
};
const createproduct = async (req, res) => {
  try {
    const { name, type, brand, price, stock } = req.body;

    // if (!name || !type || !brand || !price || !stock) {
    //   return res
    //     .status(400)
    //     .json({
    //       message:
    //         "fields are missing  ( name , type, brand, price and stock )",
    //     });
    // }

    const newproduct = {
      name,
      type,
      brand,
      price,
      stock,
    };

    const ImageFilesArray = req.files;

    // for primary image
    const primaryImageUrl = getprimaryImage(ImageFilesArray, BASE_URL);

    if (primaryImageUrl) {
      newproduct.image = primaryImageUrl;
    }

    // multiple images
    const urlsArray = getadditionalImages(ImageFilesArray, BASE_URL);

    if (urlsArray.length > 0) {
      newproduct.image_urls = urlsArray;
    }

    // insert the data to db
    const updateproduct = await new product(newproduct).save();
    return res
      .status(200)
      .json({ message: "data is retrieved", data: updateproduct });
  } catch (err) {
    conole.log(err);
    return res
      .status(500)
      .json({ message: "internal serval error", err: err.message });
  }
};

const updateproduct = async (req, res) => {
  const product_id = req.params.id;
  if (!product_id) {
    return res.status(404).send("cannot find the product");
  }
  const { name, brand, price, discount, stock } = req.body;
  const productdata = { name, brand, price, discount, stock };

  const ImageFilesArray = req.files;
  const primaryImageUrl = getprimaryImage(ImageFilesArray, BASE_URL);

  if (primaryImageUrl) {
    productdata.image = primaryImageUrl;
  }

  const urlsArray = getadditionalImages(ImageFilesArray, BASE_URL);

  if (urlsArray.length > 0) {
    productdata.image_urls = urlsArray;
  }

  const updateproductdata = await product.findByIdAndUpdate(
    product_id,
    productdata,
    {
      new: true,
    }
  );
  if (!updateproductdata) {
    return res.status(404).send("cannot update the file");
  }
  return res
    .status(200)
    .json({ message: "data updated successfully", data: updateproductdata });
};

const getproduct = async (req, res) => {
  try {
    const { page = 2, limit = 10, brand, stock, price} = req.query;

    const skip = (page - 1) * limit;
    const fileObj = {};

    if (brand) {
      fileObj.brand = brand;
    }

    if (stock) {
      fileObj.stock = { $lt: stock };
    }
    if(price) {
      fileObj.price = {price:{$gte:pricestarts,$lte:priceends}}
    }

    const products = await product.find(fileObj).skip(skip).limit(limit);
    const total = await product.countDocuments(fileObj);

    return res
      .status(200)
      .json({ message: "products fetched", total, data: products });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "cannot find products" });
  }
};
module.exports = { createproduct, updateproduct, getproduct };
