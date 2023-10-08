const express = require("express");
const {
  addItems,
  addToCart,
  deleteFromCart,
  getCartItems,
  getItemDetails,
  getItemById,
} = require("../Controllers/ItemController");
const router = express.Router();

router.post("/", addItems);
router.get("/", getItemDetails);
router.get("/:id", getItemById);
router.get("/cart/:id", getCartItems);
router.put("/cart/:id", addToCart);
router.delete("/cart/:id", deleteFromCart);

module.exports = router;
