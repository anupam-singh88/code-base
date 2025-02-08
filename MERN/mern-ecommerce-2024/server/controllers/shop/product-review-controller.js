const { createBadRequestError } = require("../../errors/bad-request-error");
const { createCustomApiError } = require("../../errors/custom-error");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");
const { createApiResponse } = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const mongoose = require("mongoose");

const addProductReview = asyncHandler(async (req, res) => {

  const { productId, userId, userName, reviewMessage, reviewValue } =
    req.body;

  if (!productId || !userId || !userName || !reviewMessage || !reviewValue) {
    createBadRequestError(
      "productId, userId, userName, reviewMessage, reviewValue are required!"
    )
  }

  //check productid or userid is valid or not
  if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json(createBadRequestError("Invalid Product Id or User Id"));
  }


  const order = await Order.findOne({
    userId,
    "cartItems.productId": productId,
    // orderStatus: "confirmed" || "delivered",
  });

  if (!order) {
    return res.status(403).json(
      createCustomApiError(
        403,
        "You can't review this product without purchasing it!"
      )
    );
  }

  const checkExistinfReview = await ProductReview.findOne({
    productId,
    userId,
  });

  if (checkExistinfReview) {
    return res.status(400).json(
      createBadRequestError("You have already reviewed this product!")
    );
  }

  const newReview = new ProductReview({
    productId,
    userId,
    userName,
    reviewMessage,
    reviewValue,
  });

  await newReview.save();

  const reviews = await ProductReview.find({ productId });
  const totalReviewsLength = reviews.length;
  const averageReview =
    reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
    totalReviewsLength;

  await Product.findByIdAndUpdate(productId, { averageReview });

  res.status(201).json(
    createApiResponse(201, newReview, "Review added successfully!")
  );

})

const getProductReviews = asyncHandler(async (req, res) => {

  const { productId } = req.params;

  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json(createBadRequestError("Invalid Product Id"));
  }

  const reviews = await ProductReview.find({ productId });



  res.status(200).json(
    createApiResponse(200, reviews, "Reviews fetched successfully!")
  );

}
)

module.exports = { addProductReview, getProductReviews };
