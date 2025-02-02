const express = require("express");
//Do not block the api
const cors = require("cors");
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcom to the server ", status: true });
});

const authRouters = require("./routes/auth.route.js");
app.use("/auth", authRouters);

const userRouters = require("./routes/user.route.js");
app.use("/api/users", userRouters);

const productRouters = require("./routes/product.routes.js");
app.use("/api/products", productRouters);

const adminProductRouters = require("./routes/adminProduct.routes.js");
app.use("/api/admin/products", adminProductRouters);

const cartRouter = require("./routes/cart.route.js");
app.use("/api/cart", cartRouter);

const cartItemRouter = require("./routes/cartItem.route.js");
app.use("/api/cart_items", cartItemRouter);

const orderRouter = require("./routes/order.routes.js");
app.use("/api/orders", orderRouter);

const adminOrderRouter = require("./routes/admin.route.js");
app.use("/api/admin/orders", adminOrderRouter);

const reviewRouter = require("./routes/review.routes.js");
app.use("/api/reviews", reviewRouter);

const ratingRouter = require("./routes/rating.routes.js");
app.use("/api/ratings", ratingRouter);

module.exports = app;
