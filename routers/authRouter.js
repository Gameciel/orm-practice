const router = require("express").Router();
const { authController } = require("../controllers");

router.post("/register", authController.register);

module.exports = { authRouter: router };
