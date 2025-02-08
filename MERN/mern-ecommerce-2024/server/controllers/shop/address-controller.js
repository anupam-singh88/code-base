const mongoose = require("mongoose");
const { createBadRequestError } = require("../../errors/bad-request-error");
const { createCustomApiError } = require("../../errors/custom-error");
const Address = require("../../models/Address");
const { createApiResponse } = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const addAddress = asyncHandler(async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json(
        createBadRequestError("User id, address, city, pincode, phone, and notes are required!")
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json(createBadRequestError("Invalid User Id"));
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      notes,
      phone,
    });

    await newlyCreatedAddress.save();
    res.status(201).json(createApiResponse(201, newlyCreatedAddress, "Address added successfully"));
  } catch (e) {
    console.error("Error adding address:", e); // Log the entire error
    res.status(500).json(createCustomApiError(500, "Some error occurred!", e.message));
  }
});

const fetchAllAddress = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json(createBadRequestError("User id is required!"));
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json(createBadRequestError("Invalid User Id"));
    }

    const addressList = await Address.find({ userId });

    res.status(200).json(createApiResponse(200, addressList, "Address fetched successfully"));
  } catch (e) {
    console.error("Error fetching addresses:", e);
    res.status(500).json(createCustomApiError(500, "Some error occurred!", e.message));
  }
});

const editAddress = asyncHandler(async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json(createBadRequestError("User and address id are required!"));
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json(createBadRequestError("Invalid User Id or Address Id"));
    }

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json(createCustomApiError(404, "Address not found!"));
    }

    res.status(200).json(createApiResponse(200, address, "Address updated successfully"));
  } catch (e) {
    console.error("Error editing address:", e);
    res.status(500).json(createCustomApiError(500, "Some error occurred!", e.message));
  }
});

const deleteAddress = asyncHandler(async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json(createBadRequestError("User and address id are required!"));
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json(createBadRequestError("Invalid User Id or Address Id"));
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json(createCustomApiError(404, "Address not found!"));
    }

    res.status(200).json(createApiResponse(200, address, "Address deleted successfully"));
  } catch (e) {
    console.error("Error deleting address:", e);
    res.status(500).json(createCustomApiError(500, "Some error occurred!", e.message));
  }
});

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };
