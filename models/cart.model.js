const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'users',require: true },
  cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref:'cartItems',require: true }],
  totalPrice: { type: Number, require: true, default: 0 },
  totalItem: { type: Number, require: true, default: 0 },
  totalDiscountPrice: { type: Number, require: true, default: 0 },
  discount: { type: Number, require: true, default: 0 },
});

const Cart = mongoose.model("cart",cartSchema);

module.exports = Cart;
