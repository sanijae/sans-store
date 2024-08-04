const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getProductsByID = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const { name, description, price, imageURL } = req.body;

  const product = new Product({
    name,
    description,
    price,
    imageURL,
    createdBy: req.user._id
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, imageURL } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.description = description;
    product.price = price;
    product.imageURL = imageURL;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) {
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};
