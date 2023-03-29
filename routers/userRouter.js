const router = require("express").Router();
const { userController } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/auth.js");

router.get("/", userController.getAllUser);
router.get("/total", verifyToken, checkRole, userController.getTotalUser);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUserByID);
router.delete("/:id", userController.deleteUserByID);

module.exports = { userRouter: router };
