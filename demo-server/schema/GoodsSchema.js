let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let GoodsSchema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice":Number,
  "productImage":String,
  "checked":String,
  "productNum":Number
})
module.exports = GoodsSchema
