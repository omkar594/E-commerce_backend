const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref:'product',require: true },
  size: { type: String},
  quantity: { type: Number, require: true },
  price: { type: Number, require: true },
  discountPrice: { type: Number, require: true },
  userId: {type: mongoose.Schema.Types.ObjectId,ref:'users', require: true },
});

const OrderItem = mongoose.model("orderItems",orderItemSchema);

module.exports = OrderItem;
