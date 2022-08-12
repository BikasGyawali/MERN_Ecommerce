const { Router } = require("express");
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");
const router = Router();

router.get("/getsingleorder/:id", orderController.getSingleOrder);
router.get("/getAllOrders", auth, orderController.getAllOrders);
router.post("/createorder", orderController.createOrder);
router.put("/updateOrder", auth, orderController.updateOrder);
router.delete("/deleteOrder/:id", auth, orderController.deleteOrder);
router.get("/order/me", auth, orderController.myOrders);
module.exports = router;
