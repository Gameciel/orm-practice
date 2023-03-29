const router = require("express").Router();
const { authController } = require("../controllers");

router.post("/register", authController.register);
router.get("/login", authController.login);

module.exports = { authRouter: router };
