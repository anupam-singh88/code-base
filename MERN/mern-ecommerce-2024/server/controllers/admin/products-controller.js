const { createBadRequestError } = require("../../errors/bad-request-error");
const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
const { createApiResponse } = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const handleImageUpload = asyncHandler(async (req, res) => {

  const b64 = Buffer.from(req.file.buffer).toString("base64");
  const url = "data:" + req.file.mimetype + ";base64," + b64;
  const result = await imageUploadUtil(url);

  // res.json({
  //   success: true,
  //   result,
  // });

  res.status(200).json(
    createApiResponse(200, result, "Image uploaded successfully")
  )



});

//add a new product
const addProduct = asyncHandler(async (req, res) => {

  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  } = req.body;

  if (!image || !title || !description || !category || !brand || !price || !salePrice || !totalStock) {
    const msgObj = {};
    if (!image) msgObj.image = "image is required";
    if (!title) msgObj.title = "title is required";
    if (!description) msgObj.description = "description is required";
    if (!category) msgObj.category = "category is required";
    if (!brand) msgObj.brand = "brand is required";
    if (!price) msgObj.price = "price is required";
    if (!salePrice) msgObj.salePrice = "salePrice is required";
    if (!totalStock) msgObj.totalStock = "totalStock is required";

    const msg = "Please provide all the required fields " + JSON.stringify(Object.values(msgObj));

    return res.status(400).json(
      createBadRequestError(msg)
    )
  }


  const newlyCreatedProduct = new Product({
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  });

  await newlyCreatedProduct.save();
  // res.status(201).json({
  //   success: true,
  //   data: newlyCreatedProduct,
  // });

  res.status(201).json(
    createApiResponse(201, newlyCreatedProduct, "Product added successfully")
  )

});

//fetch all products

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const listOfProducts = await Product.find({});

    res.status(200).json(
      createApiResponse(200, listOfProducts, "All products fetched successfully")
    )
  } catch (e) {
    console.log(e);
    res.status(500).json(
      createBadRequestError("Error occured while fetching products, please try again")
    );
  }
});

//edit a product
const editProduct = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  } = req.body;

  //check that id is mongoose object id

  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(400).json(
      createBadRequestError("Invalid product id")
    );


  let findProduct = await Product.findById(id);
  if (!findProduct)
    return res.status(404).json(
      createBadRequestError("Product not found")
    );

  findProduct.title = title || findProduct.title;
  findProduct.description = description || findProduct.description;
  findProduct.category = category || findProduct.category;
  findProduct.brand = brand || findProduct.brand;
  findProduct.price = price === "" ? 0 : price || findProduct.price;
  findProduct.salePrice =
    salePrice === "" ? 0 : salePrice || findProduct.salePrice;
  findProduct.totalStock = totalStock || findProduct.totalStock;
  findProduct.image = image || findProduct.image;
  findProduct.averageReview = averageReview || findProduct.averageReview;

  await findProduct.save();
  res.status(200).json(
    createApiResponse(200, findProduct, "Product updated successfully")
  );

});

//delete a product
const deleteProduct = asyncHandler(async (req, res) => {

  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(400).json(
      createBadRequestError("Invalid product id")
    );

  const product = await Product.findByIdAndDelete(id);

  if (!product)
    return res.status(404).json(
      createBadRequestError("Product not found")
    );

  res.status(200).json(
    createApiResponse(200, {}, "Product deleted successfully")
  );

});

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
