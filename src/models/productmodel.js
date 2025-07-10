const { Timestamp } = require('bson');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{type : String},
    type : {type :String},
    brand : {type:String},
    descripion : {type:String},
    price : {type:Number},
    discount  :{type:Number},
    stock : {type:String},
    image : {type:String},
    image_urls : [{type:String}],
    rating : {type:String},
},{
    Timestamp : true
})

const product = mongoose.model('product',productSchema);

module.exports = product;
