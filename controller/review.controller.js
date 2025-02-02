const reviewService = require("../service/raview.service");

const createReview = async (res, req) => {
  const user = req.user;
  try {
    const review = await reviewService.createReview(req.body, user);
    return res.status(201).send(review);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

const getAllReview = async (res, req) => {
    const productId = req.params.productId;
  const user = req.user;
  try {
    const reviews = await reviewService.getAllReview(productId);
    return res.status(201).send(reviews);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};
module.exports = {
    createReview,
    getAllReview,
}



