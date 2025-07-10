const mongoose = require('mongoose');
const paymentEnum = ["UPI","CARD","COD"];
const orderEnum = ["proceesing","shipped","delivered","cancelled"]

const orderSchema = new mongoose.Schema({
    user_id : {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    items:[{
        product_id : {type:mongoose.Schema.Types.ObjectId,ref:'product',required:true},
        quantity : {type:String},
        price_at_purchase : {type:Number}

    }],
    total_summary : {type:Number},
    payment_method : {type:paymentEnum,required:true},
    order_status :{type:orderEnum,required:true},

},{
     Timestamp : true
});
const order = mongoose.model('order',orderSchema);

module.exports = order;


