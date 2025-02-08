const { createBadRequestError } = require("../../errors/bad-request-error");
const { createCustomApiError } = require("../../errors/custom-error");
const Product = require("../../models/Product");
const { createApiResponse } = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const searchProducts = asyncHandler(async (req, res) => {

  const { keyword } = req.params;
  if (!keyword || typeof keyword !== "string") {
    return res.status(400).json(createBadRequestError("Invalid keyword"));
  }

  const regEx = new RegExp(keyword, "i");

  const createSearchQuery = {
    $or: [
      { title: regEx },
      { description: regEx },
      { category: regEx },
      { brand: regEx },
    ],
  };

  const searchResults = await Product.find(createSearchQuery);

  res.status(200).json(
    createApiResponse(200, searchResults, "Search results fetched successfully!")
  );
}
)

module.exports = { searchProducts };
