const CartItem = require("../models/cartItem.model");
const userService = require("../service/user.service.js");

async function updateCartItem(userId, cartItemId, cartItemData) {
  try {
    const item = await findCartItemById(cartItemId);

    if (!item) {
      throw new Error("cart item no found : ", cartItemId);
    }
    const user = await userService.findUserById(item.userId);
    if (!user) {
      throw new Error("User not found : ", userId);
    }
    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("You can't update this cart item");
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

async function removeCartItem(userId, cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  const user = await userService.findUserById(userId);

  const checkUserId=user._id.toString()
  const checkCartId=cartItem.userId.toString()

  if (checkUserId === checkCartId) {
    return await CartItem.findByIdAndDelete(cartItemId);
  }
  throw new Error("You cant't remove another user's item");
}

async function findCartItemById(cartItemId) {
  const cartItem = await CartItem.findById(cartItemId).populate("product");
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cartItem not found with id ", cartItemId);
  }
}
module.exports = { updateCartItem, removeCartItem, findCartItemById };
