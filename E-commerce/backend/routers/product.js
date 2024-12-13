const express = require("express");
const {
  allProduct,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProduct,
} = require("../controller/product.js");
const { authenticationMid, roleChecked } = require("../middleware/auth.js");

const router = express.Router();

router.get(
  "/admin/products",
  authenticationMid,
  roleChecked("admin"),
  adminProduct
);
router.get("/products", allProduct);
router.get("/products/:id", detailProduct);
router.post(
  "/products/new",
  authenticationMid,
  roleChecked("admin"),
  createProduct
);
router.delete(
  "/products/:id",
  authenticationMid,
  roleChecked("admin"),
  deleteProduct
);
router.put(
  "/products/:id",
  authenticationMid,
  roleChecked("admin"),
  updateProduct
);
router.post("/products/newReview", authenticationMid, createReview);

module.exports = router;
