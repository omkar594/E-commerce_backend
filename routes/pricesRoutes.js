const express = require("express");
const authenticate = require("../middleware/authenticate");
const priceController = require("../controller/priceRequest.controller");

const router = express.Router();

router.post("/submit-price",authenticate,priceController.submitPrice);
router.get("/pending-prices",authenticate,priceController.getPendingPrices);
router.post("/approve-reject-price", authenticate,priceController.approveRejectPrice);

module.exports = router;


