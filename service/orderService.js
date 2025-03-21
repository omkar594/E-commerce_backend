const cartService = require("../service/cart.service.js");
const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItems.js");

async function createOrder(user,shippingAddress) {
  let address;
  const users = await user;
  console.log(user)
  
  
  if (shippingAddress._id) {
    let existAddress = await Address.findById(shippingAddress._id);
    address = existAddress;
  } else {
    address = new Address(shippingAddress);
    console.log("This is the address",address)
    
    await address.save();
    address.user = user;

    user.address.push(address);
    await user.save();
  }

  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });
    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }

  const createdOrder = new Order({
    users,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountPrice: cart.totalDiscountPrice,
    discount: cart.discount,
    totalItem: cart.totalItem,
    shippingAddress: address,
  });

  const savedOrder = await createdOrder.save();

  return savedOrder;
}
async function placeOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";

  return await order.save();
}
async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CONFIRMED";

  return await order.save();
}
async function shipOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "SHIPPED";

  return await order.save();
}
async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "DELIVERED";

  return await order.save();
}
async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CANCELLED";
  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findById(orderId).populate("users")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

    // console.log("OrderService",order,"____________")

  return order;
}

async function userOrderHistory(userId) {
  try {
    const order = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();

    return order;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
}
async function deleteOrder(orderId) {
  console.log("ok");
  // console.log("Route hit, orderId:",orderId);
  console.log("This is the orderId",orderId)
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(orderId);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelledOrder,
  findOrderById,
  userOrderHistory,
  getAllOrders,
  deleteOrder
};
