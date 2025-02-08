const { createCustomApiError } = require("../../errors/custom-error");
const Product = require("../../models/Product");
const { createApiResponse } = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const getFilteredProducts = asyncHandler(async (req, res) => {

  const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

  let filters = {};

  if (category.length) {
    filters.category = { $in: category.split(",") };
  }

  if (brand.length) {
    filters.brand = { $in: brand.split(",") };
  }

  let sort = {};

  switch (sortBy) {
    case "price-lowtohigh":
      sort.price = 1;

      break;
    case "price-hightolow":
      sort.price = -1;

      break;
    case "title-atoz":
      sort.title = 1;

      break;

    case "title-ztoa":
      sort.title = -1;

      break;

    default:
      sort.price = 1;
      break;
  }

  const products = await Product.find(filters).sort(sort);

  res.status(200).json(
    createApiResponse(200, products, "Products fetched successfully")
  );

});

const getProductDetails = asyncHandler(async (req, res) => {

  const { id } = req.params;

  //check id to mongoose object id
  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(400).json(
      createCustomApiError(400, "Invalid product id", "Bad Request")
    );




  const product = await Product.findById(id);

  if (!product)
    return res.status(404).json(
      createCustomApiError(404, "Product not found", "Not Found")
    )
  res.status(200).json({
    success: true,
    data: product,
  });

});

module.exports = { getFilteredProducts, getProductDetails };
