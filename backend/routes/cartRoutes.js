const express = require('express');
const { protect } = require('../middleware/auth');
const { addToCart, getCart, deleteFromCart } = require('../controllers/cartController');
const router = express.Router();

router.route('/').post(protect, addToCart);
router.route('/:userId').get(protect, getCart);
router.delete('/:itemId', deleteFromCart);

module.exports = router;
