const mongoose = require("mongoose");

const roleEnum = ["user", "admin", "seller"];
const addressEnum = ["home", "work", "pg", "other"];

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: Number },
  email: { type: String },
  password: { type: String },
  address: [
    {
      address_line_one: { type: String },
      landmark: { type: String },
      pin: { type: Number },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      address_type: { type: addressEnum, default: "home", required: true },
    },
  ],
  role: { type: roleEnum, required: true, default: "user" },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
