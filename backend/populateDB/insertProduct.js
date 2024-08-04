const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sans-store');
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const addProducts = async () => {
  await connectDB();

  try {
    const products = [];
    for (let i = 1; i <= 150; i++) {
      products.push({
        name: `Product ${i}`,
        description: `Description for product ${i}`,
        price: Math.floor(Math.random() * 1000) + 1,
        imageURL: `https://picsum.photos/200/300?random=${i}`
      });
    }

    await Product.insertMany(products);
    console.log('Products added successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error(err.message);
    mongoose.connection.close();
  }
};

addProducts();
