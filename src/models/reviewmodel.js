const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    title: { type: String },
    rating: { type: String },
    description: { type: String },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  { timestamps: true }
);
const review = mongoose.model("review", reviewSchema);
module.exports = review;
