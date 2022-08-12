const { Router } = require("express");
const { verifyUser } = require("../controllers/userController");
const userController = require("../controllers/userController");
const router = Router();
const auth = require("../middleware/auth");

router.post("/register", userController.signup);
router.post("/login", userController.login);
router.post("/updateuser", userController.updateUser);
//router.post("/logout",auth, userController.logout);
router.post("/changepassword/:id",userController.changePassword);
router.post("/forgotpassword",userController.forgotPassword);
router.get("/auth", auth, userController.getUser);

module.exports = router;
