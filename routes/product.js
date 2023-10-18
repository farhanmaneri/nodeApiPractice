const express = require("express");
const {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  editProduct,
} = require("../controllers/product");

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.delete("/:id", deleteProduct);
router.put('/:id', editProduct)

router.post("/", createProduct);

// Todo : Update product

module.exports = router;
