const userController = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();


router.get("/usermodels", userController.getUsers);

module.exports = router;