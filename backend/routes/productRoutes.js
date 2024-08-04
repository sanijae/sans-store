const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct, getProductsByID } = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/').get(getProducts).post(protect, createProduct);
router.route('/:id').get(getProductsByID).put(protect, updateProduct).delete(protect, deleteProduct);

module.exports = router;
