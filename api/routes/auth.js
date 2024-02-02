const authController = require("../controllers/auth.controller");

const express = require("express");
const router = express.Router();

router.post("/sign-up", authController.signUp);

router.post("/login", authController.login);

router.post("/reset-password", authController.resetPassword);

router.post("/send-email", authController.sendEmail);


module.exports = router;