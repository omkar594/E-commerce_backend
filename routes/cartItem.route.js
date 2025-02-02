const express = require("express");

const router=express.Router();

const cartItemController=require("../controller/cartitem.controller")
const authenticate = require("../middleware/authenticate");


router.put("/:id", authenticate,cartItemController.updateCartItem);
router.delete("/:id", authenticate,cartItemController.removeCartItem);


module.exports = router;
