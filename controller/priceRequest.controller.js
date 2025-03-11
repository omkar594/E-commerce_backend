const priceService = require("../service/priceRequest.service");

exports.submitPrice = async (req, res) => {
    console.log("ok");
    try {
        const { userId, productId, proposedPrice } = req.body;
        console.log(userId, productId, proposedPrice)
        const priceRequest = await priceService.submitPriceRequest(userId, productId, proposedPrice);
        res.json({ message: "Price submitted, waiting for approval.", priceRequest });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPendingPrices = async (req, res) => {
    try {
        const pendingPrices = await priceService.getPendingPriceRequests();
        console.log("Backend hit with this" )
        res.json(pendingPrices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.approveRejectPrice = async (req, res) => {
    try {
        const { requestId, action } = req.body;
        const updatedRequest = await priceService.updatePriceRequest(requestId, action);
        res.json({ message: `Price ${action}`, updatedRequest });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
