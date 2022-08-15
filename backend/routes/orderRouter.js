const { Router } = require("express");
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");
const router = Router();

router.get("/getsingleorder/:id", orderController.getSingleOrder);
router.get("/getallorders", orderController.getAllOrders);
router.post("/createorder", orderController.createOrder);
router.put("/updateorder/:id", orderController.updateOrder);
router.delete("/deleteorder/:id", orderController.deleteOrder);
router.get("/order/me", auth, orderController.myOrders);
module.exports = router;
