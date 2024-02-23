const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const Order = require("../models/orderM");
const User = require("../models/userM");

dotenv.config();

exports.purchasePremium = async (req, res, next) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 30000;

    //..
    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      } else {
        try {
          await Order.create({
            orderid: order.id,
            status: "PENDING",
            userId: req.user.id,
          });
          // await req.user.createOrder({ orderid: order.id, status: "PENDING" });
          res.status(201).json({ order, key_id: rzp.key_id });
        } catch (error) {
          console.log(error);
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "something went wrong!!!", error: error });
  }
};

//...................................................................................................

exports.updateTransactionStatusSuccess = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderid: req.body.order_id },
      {
        paymentid: req.body.payment_id,
        status: "SUCCESSFUL",
      }
    );

    const id = order.userId;
    await User.findByIdAndUpdate(id, { ispremiumuser: true });
    console.log("TRANSACTION MARKED AS SUCCESSFUL!");

    res.status(202).json({ success: true, message: "Transaction Successful" });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTransactionStatusFailed = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderid: req.body.order_id },
      {
        status: "FAILED",
      }
    );

    console.log("TRANSACTION MARKED AS FAILED!");
    res.json({ message: "status updated to failed" });
  } catch (error) {
    console.log(error);
  }
};
