const stripeController = require("../controllers/stripe.controller");

const express = require("express");
const router = express.Router();

router.post("/create-checkout-session", stripeController.createPaymentSession);

module.exports = router;