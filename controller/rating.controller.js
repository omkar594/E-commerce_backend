const ratingService = require("../service/rating.service.js");

const createRating = async (res, req) => {
  const user = req.user;
  try {
    const rating = await ratingService.createRating(req.body, user);
    return res.status(201).send(rating);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

const getAllRating = async (res, req) => {
    const productId = req.params.productId;
  const user = req.user;
  try {
    const rating = await ratingService.getAllRating(productId);
    return res.status(201).send(rating);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

module.exports = {
    createRating,
    getAllRating,
}



