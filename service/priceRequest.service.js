const PriceRequest = require("../models/priceRequest.model");
const Product = require("../models/product.model");

exports.submitPriceRequest = async (userId, productId, proposedPrice) => {
    console.log("Ok now checking submitPriceRequest");
    const product = await Product.findById(productId);
    console.log("This is the product Which  get Find", product.price);
    if (!product) throw new Error("Product not found");

    if (proposedPrice < 0.7 * product.discountedPrice || proposedPrice > product.discountedPrice) {
        throw new Error("Invalid price range");
    }

    const priceRequest = new PriceRequest({ userId, productId, proposedPrice });
    console.log("here is the new price", priceRequest)
    await priceRequest.save();
    return priceRequest;
};

exports.getPendingPriceRequests = async () => {
    try{

        return await PriceRequest.find({ status: "pending" }).populate("productId");
    }catch(e){
        console.log("this is the error", e.message);
    }
    console.log("GetPendingPriceRequest");
};

exports.updatePriceRequest = async (requestId, action) => {
    if (!["approved", "rejected"].includes(action)) {
        throw new Error("Invalid action");
    }

    return await PriceRequest.findByIdAndUpdate(requestId, { status: action }, { new: true });
};
