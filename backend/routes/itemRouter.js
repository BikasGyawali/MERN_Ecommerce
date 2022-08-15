const { Router } = require("express");
const itemController = require("../controllers/itemController");
const { ImageUpload } = require("../controllers/imageController");
const router = Router();

router.post(
  "/admin/additem",
  ImageUpload.single("image"),
  itemController.addItem
);
router.post("/admin/updateitem/:id",ImageUpload.single('image'), itemController.updateItem);
router.get("/getallitem", itemController.getAllItem);
router.get("/getsingleitem/:id", itemController.getSingleItem);
router.get("/admin/getitem", itemController.getAdminItem);
router.delete("/admin/deleteitem/:id", itemController.deleteItem);

module.exports = router;
