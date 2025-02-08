const { createBadRequestError } = require("../../errors/bad-request-error");
const { createCustomApiError } = require("../../errors/custom-error");
const Feature = require("../../models/Feature");
const { createApiResponse } = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const addFeatureImage = asyncHandler(async (req, res) => {
  const { image } = req.body;

  if (!image) {
    createBadRequestError("Image is required");
  }

  const featureImages = new Feature({
    image,
  });

  await featureImages.save();

  res.status(201).json(
    createApiResponse(201, featureImages, "Feature Image added successfully")
  );

});

const getFeatureImages = asyncHandler(async (req, res) => {
  const images = await Feature.find({});

  res.status(200).json(
    createApiResponse(200, images, "Feature Images fetched successfully")
  );
}
)

module.exports = { addFeatureImage, getFeatureImages };
