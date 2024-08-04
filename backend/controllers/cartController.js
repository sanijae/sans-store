const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  const { productId, userId } = req.body;
  const cartItem = await Cart.create({ product: productId, user: userId });
  if (cartItem) {
    res.status(201).json(cartItem);
  } else {
    res.status(400).json({ message: 'Error adding to cart' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ user: userId }).populate('product');
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    await Cart.findByIdAndDelete(itemId);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
