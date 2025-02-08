const { createBadRequestError } = require("../../errors/bad-request-error");
const { createCustomApiError } = require("../../errors/custom-error");
const Order = require("../../models/Order");
const { createApiResponse } = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const getAllOrdersOfAllUsers = asyncHandler(async (req, res) => {

  const orders = await Order.find({});

  if (!orders.length) {
    return res.status(404).json(
      createCustomApiError(404, "No orders found!")
    );
  }

  res.status(200).json(
    createApiResponse(200, orders, "Orders fetched successfully!")
  );

});

const getOrderDetailsForAdmin = asyncHandler(async (req, res) => {

  const { id } = req.params;

  if (!id) {
    return res.status(400).json(
      createBadRequestError9("Order id is required!")
    );
  }

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json(
      createCustomApiError(404, "Order not found!")
    );
  }

  res.status(200).json(createApiResponse(200, order, "Order details fetched successfully!"));

});

const updateOrderStatus = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const { orderStatus } = req.body;

  if (!id) {
    createBadRequestError("Order id is required!");
  }

  if (!orderStatus) {
    createBadRequestError("Order status is required!");
  }

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json(createBadRequestError("Order not found!"));
  }

  await Order.findByIdAndUpdate(id, { orderStatus });

  res.status(200).json(createApiResponse(200, null, "Order status updated successfully!"));

});

module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
