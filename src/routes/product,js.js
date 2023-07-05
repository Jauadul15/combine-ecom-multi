// productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const upload = require("../middlewares/multer");

router.post("/products", upload.single("photo"), productController.createProduct);
router.put("/products/:productId", upload.single("photo"), productController.updateProduct);
router.get("/products", productController.listProducts);
router.get("/products/:slug", productController.getProductBySlug);
router.get("/products/:productId/photo", productController.getProductPhoto);
router.delete("/products/:productId", productController.removeProduct);

module.exports = router;
