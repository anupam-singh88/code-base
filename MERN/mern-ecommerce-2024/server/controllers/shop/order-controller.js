const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const asyncHandler = require("../../utils/asyncHandler");
const mongoose = require("mongoose");
const { createBadRequestError } = require("../../errors/bad-request-error");
const { createApiResponse } = require("../../utils/ApiResponse");
const { create } = require("../../models/User");
const { createCustomApiError } = require("../../errors/custom-error");

const createOrder = asyncHandler(

  async (req, res) => {
    console.log("🚀 ~ process.env.FRONTEND_URL:", process.env.FRONTEND_URL)

    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.FRONTEND_URL}/shop/paypal-return`,
        cancel_url: `${process.env.FRONTEND_URL}/shop/paypal-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);

        return res.status(500).json(
          createCustomApiError(
            500,
            "Some error occurred while creating the payment!",
            error.message
          )
        );
      } else {
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  }
)

const capturePayment = asyncHandler(
  async (req, res) => {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json(

        createCustomApiError(404, "Order not found with the provided id!")
      );
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        // return res.status(404).json({
        //   success: false,
        //   message: `Not enough stock for this product ${product.title}`,
        // });

        return res.status(404).json(
          createCustomApiError(404, `Not enough stock for this product ${product.title}`)
        )
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json(
      createApiResponse(200, order, "Payment captured successfully!")
    );

  }
)

const getAllOrdersByUser = asyncHandler(async (req, res) => {

  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json(
      createBadRequestError("User id is required!")
    );
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json(
      createBadRequestError("Invalid User Id")
    );
  }

  const orders = await Order.find({ userId });

  if (!orders.length) {
    return res.status(404).json(
      createCustomApiError(404, "No orders found for the provided user id!")
    );
  }

  res.status(200).json(
    createApiResponse(200, orders, "Orders fetched successfully!")
  );

})

const getOrderDetails = asyncHandler(async (req, res) => {

  const { id } = req.params;

  //check id valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json(
      createBadRequestError("Invalid Order Id provided!")
    );
  }



  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json(
      createCustomApiError(404, "Order not found with the provided id!")
    );
  }

  res.status(200).json(
    createApiResponse(200, order, "Order details fetched successfully!")
  );

})

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
