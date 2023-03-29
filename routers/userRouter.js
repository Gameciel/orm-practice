const router = require("express").Router();
const { userController } = require("../controllers");

router.get("/", userController.getAllUser);
router.get("/total", userController.getTotalUser);

router.get("/:id", userController.getUserById);

module.exports = { userRouter: router };
