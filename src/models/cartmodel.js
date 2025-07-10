const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id : {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    items : [{
        productid:{type:mongoose.Schema.Types.ObjectId,ref:'product',required:true},
        quantity : {type:String}

    }]
})
const cart = mongoose.model('cart',cartSchema);

module.exports = cart;
