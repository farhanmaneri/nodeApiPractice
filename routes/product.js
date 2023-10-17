const express = require("express");
const {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/product");

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.delete("/:id", deleteProduct);

router.post("/", createProduct);

// Todo : Update product

module.exports = router;
